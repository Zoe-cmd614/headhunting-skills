#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node audit_static_site.mjs <site-project-or-dist>');
  process.exit(2);
}

const root = path.resolve(input);
const errors = [];
const warnings = [];
const error = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function inside(base, target) {
  const relative = path.relative(base, target);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function readText(file) {
  try { return fs.readFileSync(file, 'utf8'); }
  catch (cause) { error(`Cannot read ${file}: ${cause.message}`); return ''; }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

let staticRoot = root;
const manifestPath = path.join(root, '.openai', 'hosting.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (!manifest?.static?.directory) {
      error('.openai/hosting.json has no static.directory');
    } else {
      const candidate = path.resolve(root, manifest.static.directory);
      if (!inside(root, candidate)) error('static.directory escapes the supplied project root');
      else staticRoot = candidate;
    }
  } catch (cause) {
    error(`Invalid .openai/hosting.json: ${cause.message}`);
  }
}

function cleanReference(value) {
  const clean = value.split('#')[0].split('?')[0];
  try { return decodeURIComponent(clean); } catch { return clean; }
}

function localReference(value) {
  return Boolean(value) && !/^(?:[a-z]+:|\/\/|#)/i.test(value);
}

function resolveReference(value, fromDirectory) {
  const clean = cleanReference(value);
  if (/^[\\/]/.test(clean)) return path.resolve(staticRoot, clean.replace(/^[\\/]+/, ''));
  return path.resolve(fromDirectory, clean);
}

function checkReference(value, fromDirectory, label) {
  if (!localReference(value)) return;
  const target = resolveReference(value, fromDirectory);
  if (!inside(staticRoot, target)) error(`Reference escapes static directory in ${label}: ${value}`);
  else if (!fs.existsSync(target)) error(`Broken local reference in ${label}: ${value}`);
}

const files = walk(staticRoot);
const htmlFiles = files.filter((file) => file.toLowerCase().endsWith('.html'));
const indexPath = path.join(staticRoot, 'index.html');
if (!fs.existsSync(indexPath)) error(`Missing ${indexPath}`);
if (!htmlFiles.length) error(`No HTML files found in ${staticRoot}`);

for (const htmlFile of htmlFiles) {
  const html = readText(htmlFile);
  const label = path.relative(staticRoot, htmlFile) || 'index.html';
  const directory = path.dirname(htmlFile);

  for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']*)["']/gi)) {
    checkReference(match[1], directory, label);
  }

  const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter((value) => value === id).length > 1) error(`Duplicate id in ${label}: ${id}`);
  }

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) error(`Expected exactly one h1 in ${label}; found ${h1Count}`);
  if (!/<html\b[^>]*\blang\s*=/i.test(html)) error(`Missing html lang attribute in ${label}`);
  if (!/<meta\b[^>]*\bname\s*=\s*["']viewport["']/i.test(html)) error(`Missing viewport meta tag in ${label}`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=\s*["'][^"']*["']/i.test(match[0])) error(`Image missing alt in ${label}: ${match[0].slice(0, 120)}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    const href = tag.match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1];
    if (href === undefined || href === '' || href === '#' || /^javascript:/i.test(href)) warn(`Inactive or unsafe link in ${label}: ${tag.slice(0, 140)}`);
    if (/\btarget\s*=\s*["']_blank["']/i.test(tag)) {
      const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1] || '';
      if (!/\b(?:noopener|noreferrer)\b/i.test(rel)) error(`target=_blank link lacks noopener/noreferrer in ${label}: ${tag.slice(0, 140)}`);
    }
  }

  for (const match of html.matchAll(/<button\b[^>]*>/gi)) {
    if (!/\btype\s*=/i.test(match[0])) warn(`Button has no explicit type in ${label}: ${match[0].slice(0, 120)}`);
  }

  if (/\bhref\s*=\s*["']http:\/\//i.test(html)) warn(`An external link uses HTTP in ${label}`);
  if (!/<a\b[^>]*href\s*=/i.test(html)) warn(`No linked action found in ${label}`);
}

let totalBytes = 0;
for (const file of files) {
  const size = fs.statSync(file).size;
  totalBytes += size;
  if (size > 4 * 1024 * 1024) warn(`Large asset (${(size / 1024 / 1024).toFixed(1)} MB): ${path.relative(staticRoot, file)}`);
}
if (totalBytes > 15 * 1024 * 1024) warn(`Large static bundle: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

for (const cssFile of files.filter((file) => file.toLowerCase().endsWith('.css'))) {
  const css = readText(cssFile);
  const label = path.relative(staticRoot, cssFile);
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) error(`Unbalanced CSS braces in ${label} (${open}/${close})`);
  if (/(?:animation|transition)\s*:/i.test(css) && !/@media\s*\([^)]*prefers-reduced-motion/i.test(css)) {
    warn(`Motion without prefers-reduced-motion handling: ${label}`);
  }
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    checkReference(match[1], path.dirname(cssFile), label);
  }
}

for (const jsFile of files.filter((file) => /\.m?js$/i.test(file))) {
  const result = spawnSync(process.execPath, ['--check', jsFile], { encoding: 'utf8' });
  if (result.status !== 0) error(`JavaScript syntax error in ${path.relative(staticRoot, jsFile)}: ${(result.stderr || result.stdout).trim()}`);
}

const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.svg', '.txt', '.md', '.map']);
for (const file of files.filter((candidate) => textExtensions.has(path.extname(candidate).toLowerCase()))) {
  const text = readText(file);
  if (/(?:file:\/\/|https?:\/\/(?:localhost|127\.0\.0\.1)\b|[a-z]:\\users\\)/i.test(text)) {
    error(`Local-only URL or absolute user path in ${path.relative(staticRoot, file)}`);
  }
}

console.log(`Static site audit: ${path.relative(process.cwd(), staticRoot) || '.'}`);
for (const message of errors) console.error(`ERROR: ${message}`);
for (const message of warnings) console.warn(`WARN: ${message}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s), ${files.length} file(s), ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
process.exit(errors.length ? 1 : 0);
