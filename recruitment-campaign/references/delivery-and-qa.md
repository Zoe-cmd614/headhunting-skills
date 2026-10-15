# Delivery and QA

## Channel adaptation

Keep one proposition and evidence spine across channels, then adapt:

| Channel | Priority |
|---|---|
| Hero poster | employer, recruitment signal, promise, visual magnetism |
| Long article | narrative progression, evidence, role clarity, application details |
| Social carousel | one beat per frame, forward momentum, save/share value |
| Website | responsive hierarchy, exploration, proof, accessible CTA route |
| Event screen | distance legibility, minimal text, QR/action persistence |
| Job platform | clarity, role truth, qualification and application friction |

Do not crop one artifact mechanically into every channel.

## Build checkpoints

For visually ambitious work, reduce the cost of a wrong direction:

1. lock the campaign contract and visual thesis;
2. produce one representative cover plus one evidence-heavy interior section;
3. inspect them with real copy at the final size;
4. continue the full system only after the direction survives that check.

This is a working checkpoint, not automatically a user approval gate. Ask only when unresolved choices would materially change the result.

## Recruitment comprehension tests

### Five-second test

A first-time viewer should identify:

- which employer;
- what recruitment type or audience;
- one compelling reason to continue.

### Thirty-second test

The viewer should understand:

- the promise;
- what they might own;
- what mechanism makes the promise credible;
- what standard matters;
- the next action.

If they remember only the mood, the artifact failed.

### Marketing efficacy test

Ask these questions after the artifact looks polished:

- Does the opening create enough tension or desire to earn the next scroll?
- Can the applicant see themselves doing something consequential, not merely admiring the employer?
- Is the most memorable line also true of the work?
- Does evidence arrive before skepticism overtakes emotion?
- Is action framed as the natural next move rather than an administrative afterthought?

If the answer to any two is no, improve the story before polishing more surfaces.

When stakes and time justify it, run a lightweight candidate check with people who resemble the intended audience but did not help create the campaign. Show the opening without explanation, then ask:

1. Who is hiring, and for what kind of opportunity?
2. What feels different about working there?
3. What do you think you could own?
4. What would you do next?

Record comprehension and misreadings, not whether participants “like” the design. Do not collect or expose personal data that the test does not need.

## Scored review

Score each dimension 0, 1, or 2:

1. hiring objective clarity;
2. candidate recognition;
3. employer-specific promise;
4. proof and mechanism;
5. responsibility and standard;
6. visual-brand distinctiveness;
7. narrative progression;
8. action-route integrity.

Target at least 13/16. Employer-specific promise, visual-brand distinctiveness, and action-route integrity must each score above zero.

Every score of 2 must cite an observable location in the artifact or a verified supporting source. If a claim, route, visual proof, or audience response has not been verified, it cannot receive 2.

The score cannot compensate for a hard failure. Do not publish or mark complete while any of these is unresolved:

- fabricated or materially stale recruitment facts;
- employer or recruitment purpose not identifiable;
- broken, misleading, or mismatched action route;
- inaccessible essential content or unusable target-size layout;
- requested shareability not actually working;
- authorization status or non-official disclosure likely to mislead.

## Visual and technical QA

For websites, inspect at minimum:

- 1440 x 900;
- 1280 x 720;
- 390 x 844;
- 360 x 800.

Check typography, contrast, crops, content order, tap targets, motion preference, keyboard focus, asset loading, links, and overflow. For long images or documents, render the actual output and inspect every page or frame at target size.

Also verify:

- exactly one clear page-level heading;
- semantic landmarks and useful alternative text;
- focus states and keyboard-operable navigation;
- no essential content remains hidden when scripts or reveal animations fail;
- local production assets are packaged with the site;
- no `file://`, localhost, temporary-tunnel, or expired asset URL appears in the deliverable;
- layout remains readable with the longest realistic copy;
- large visual assets are compressed enough for the intended audience and network.

For a static site, run `node scripts/audit_static_site.mjs <site-project-or-dist>` from the skill folder when the script is available. Treat it as a baseline check, not a replacement for visual inspection.

Maintain an asset ledger for public deliverables: source or generation prompt, usage or license status, brand-asset authorization, font status, and whether the asset may be redistributed. Do not republish restricted campaign photography merely because it is publicly viewable.

The visual system should remain coherent across different content lengths. Do not allow isolated “small pages” or unexpected aspect-ratio changes unless intentional and clearly functional.

## CTA integrity

Verify that:

- the stated opportunity matches the destination;
- dates, locations, cohorts, roles, and eligibility agree;
- buttons and QR codes work;
- the user knows what happens after acting;
- fallback contact or status is clear when an application route is not yet open.

Use a truthful placeholder rather than a false live action.

## Publishing and shareability

A preview is not a published deliverable. When the user requests a link that others can open:

- use stable production hosting rather than a development server or tunnel;
- preserve or explicitly set the intended audience instead of assuming public access;
- verify the deployed URL returns the current artifact;
- test at least one primary CTA after deployment;
- report if authentication, geography, workspace policy, or platform protection limits access;
- never expose repository, hosting, or API credentials in source, logs, or chat.

Publishing, changing access, creating repositories, or pushing to GitHub are external mutations. Perform them only when the user authorized that action, and verify the result instead of reporting an attempted upload as success.

For an independent concept using a real employer:

- put `Independent recruitment concept` or an equally clear disclosure in the title or first viewport, not only the footer;
- do not use a domain, logo treatment, favicon, metadata, or social preview that implies official status;
- add `noindex` when publication is for review rather than public discovery;
- do not collect applications, résumés, email addresses, or other applicant data;
- link only to the verified official recruitment route;
- default to private or unlisted review unless the user explicitly authorizes public release.

If the site does collect applicant data, use an authorized ATS or approved form, minimize fields, provide the correct privacy notice, and confirm who receives the data. Do not improvise a résumé form.

## Repository and credential safety

Before a GitHub upload:

- confirm the exact repository, branch, and visibility;
- stage only the intended campaign or skill subtree;
- inspect status and diff;
- scan for tokens, `.env` files, credentials, private research, personal data, and restricted assets;
- use a normal fast-forward update or contents API; never force-push unless explicitly requested;
- verify the remote files or commit after the write.

Authorization to upload does not by itself authorize making a private artifact public. Never persist tokens in source, scripts, remotes, logs, or chat.

## Handoff

Deliver the editable source, final artifact, asset list, copy deck if applicable, link or hosting status, and a concise note about unverified claims or pending inputs.

Do not publish, send messages, alter a live application system, or make an external commitment without authorization.
