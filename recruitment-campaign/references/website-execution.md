# Website Execution

Use this reference when the requested recruitment deliverable is a website or a shareable web link.

## Design the visit, not a stack of posters

A campaign site should change the applicant's understanding as they scroll. Start from the campaign contract, then assign one narrative job to each section. A reliable architecture is:

1. **Hero** — employer, explicit recruitment signal, audience or opportunity, mother proposition, and route forward.
2. **Tension** — the candidate truth that earns attention.
3. **Reframe and proof** — how this employer makes the promise real.
4. **Contribution paths** — where different talent groups enter and what each can own.
5. **Standard and fit** — how good work is judged and who should self-select in.
6. **Action** — current destination, status, and what happens next.
7. **Aftertaste** — a quiet philosophical echo after the action is already clear.

Compress or reorder when the brief requires it, but do not let the site become repeated slogans, a brand history, or one long job description.

## First viewport contract

Within one viewport, a first-time visitor should be able to identify:

- the employer;
- that this is recruitment;
- the relevant audience or opportunity;
- one reason to continue;
- a visible route forward.

Use a full-bleed visual only when it supports the proposition and leaves a deliberate text-safe zone. The headline should feel intentional rather than simply maximal. Test it with the real background at desktop and mobile crops.

## Contribution-path pattern

For broad recruitment, keep one mother proposition and make each role group distinct with:

- `YOUR PART`: what this group may genuinely own, decide, build, operate, or improve;
- `WHAT MUST HOLD`: the standard, constraint, or consequence the work must survive;
- role-specific work evidence;
- a truthful path to current openings.

Use labels appropriate to the brand and language. The pattern is structural, not mandatory interface copy.

## Asset direction

Choose or generate images only after their narrative jobs and crops are known. For each major asset, specify:

- job in the story: summon, recognize, prove, orient, transition, or echo;
- subject and why it belongs to this employer;
- materials, environment, camera distance, light, and palette;
- exact target ratio and intended text zone;
- desktop and mobile crop priorities;
- exclusions covering product-ad tropes, generic people, category clichés, logos, and readable fabricated documents.

Prefer work evidence over decorative brand mood: unfinished material, trace, tool, interface, threshold, test, relation, or consequence. Keep representational imagery in image assets; use CSS for grids, rules, masks, abstract fields, and interaction states.

Store production assets inside the deployable project. Do not depend on temporary local paths, clipboard files, unstable image hosts, or development-only URLs.

## Coherent implementation

- Use a consistent responsive grid, margin system, type roles, palette logic, image treatment, labels, and section rhythm.
- Keep major chapters consistent in viewport behavior; avoid accidental “small pages” between full-height scenes.
- Make navigation, section order, and CTAs keyboard accessible and visible with focus.
- Use semantic landmarks, one page-level `h1`, useful `alt` text, and adequate contrast.
- Respect `prefers-reduced-motion`. Essential content must remain visible when JavaScript or reveal effects fail.
- Avoid horizontal overflow at 360 px and test long realistic copy.
- Keep mobile composition intentional; do not merely shrink desktop type and crops.
- Compress large images and remove unused assets before publishing.

For high-visual-risk work, build one representative hero and one evidence-heavy interior section first. Inspect both with real copy at target sizes, then extend the system. This avoids multiplying a wrong direction without turning every design decision into a user checkpoint.

## Web QA

Inspect at least 1440 × 900, 1280 × 720, 390 × 844, and 360 × 800. Test:

- first-viewport comprehension;
- text/background contrast and crop meaning;
- fixed headers, anchors, menus, and scroll order;
- CTA destinations and external-link behavior;
- missing assets, duplicate IDs, console errors, and overflow;
- keyboard focus, reduced motion, and tap targets;
- final quote hierarchy relative to the CTA.

Run the bundled static audit when applicable:

```text
node scripts/audit_static_site.mjs <site-project-or-dist>
```

The script catches packaging and markup failures. It does not judge visual quality or recruitment effectiveness.

## Stable publishing

When the user requests a link for other people:

1. publish to a stable production host, not localhost or a temporary tunnel;
2. preserve the existing access policy unless the user requested a change;
3. if “shareable” requires public or external access, resolve that audience explicitly;
4. verify the deployed URL returns the current version and primary assets;
5. test the primary CTA after deployment;
6. report any authentication, workspace, region, or platform restriction.

When access reliability matters, retain a recoverable fallback such as the static source bundle or authorized repository. Do not treat that fallback as a second public deployment unless the user asked for one.

External publication, access changes, repository creation, and Git pushes require user authorization. Never put credentials in the project, command line, logs, screenshots, or final response.

For a non-official concept using a real employer, make the independent status visible in the first viewport and metadata, add `noindex` when the site is published only for review, avoid official-looking domains and logo treatments, collect no applicant data, and route actions only to the verified official careers destination.

## Handoff

Provide the production link, editable source path or repository, asset inventory, and any remaining unverified recruitment facts. If the result is an independent concept for a real employer, keep a clear but visually subordinate non-official disclosure.
