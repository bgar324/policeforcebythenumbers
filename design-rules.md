# Police Force by the Numbers Design Rules

This file is a handoff document for future Codex instances. Read it before making any visual, layout, or content-structure changes.

## 1) Operating Principle

- This site is an editorial, black-and-white, data-storytelling interface.
- The design language is disciplined, structural, and content-first.
- Consistency work means standardizing existing patterns, not inventing new ones.
- A harmony pass is not permission to add new copy, new framing text, new counters, new asides, or new content architecture unless the user explicitly asks for them.

## 2) Mandatory Source of Truth

Read these first before touching page UI:

- `app/components/page-chrome.tsx`
- `app/globals.css`
- `app/components/SiteNavbar.tsx`
- `app/components/SiteFooter.tsx`
- `app/components/transition/TransitionLink.tsx`
- `app/layout.tsx`

If editing a specific page type, also read one nearby page that already feels correct before changing anything.

## 3) Current Visual Direction

- Tone: serious, analytical, restrained
- Visual model: editorial/newspaper framing, not SaaS cards, not playful marketing UI
- Primary hierarchy tool: 1px black rules and disciplined spacing
- Secondary hierarchy tool: typography and opacity, not color accents
- Interaction model: inversion and keylines, not glow/shadow-heavy decoration

## 4) Color and Theme

- Base surface is white in light mode and near-black in dark mode.
- Primary ink is near-black in light mode and near-white in dark mode.
- Keep the palette monochrome unless the user asks for a system-level change.
- Use opacity steps for hierarchy: `text-black/55`, `/60`, `/65`, `/70`, `/75`, `/80`
- Dark mode is already handled globally in `app/globals.css` and `app/layout.tsx`. Do not introduce page-level theme logic unless necessary.

## 5) Typography

- UI/body font: `Source Sans 3` via `--font-nav`
- Display serif: `Newsreader` via `--font-masthead`
- Use the serif selectively for masthead-style emphasis, not everywhere.

Type roles:

- Page eyebrow: `text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70`
- Section eyebrow: `text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60`
- Meta label: `text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55`
- Page title default: `text-4xl sm:text-6xl`, medium or semibold depending on page
- Body copy: `text-base leading-relaxed text-black/75` or `text-black/80`

Do not introduce new type scales when the existing shared ones are sufficient.

## 6) Layout System

The canonical page frame is:

- `mx-auto w-full max-w-[1200px] border-x border-black`

The canonical page gutters are:

- `px-6 sm:px-10`

The canonical page spacing is:

- Header block: `py-10 sm:py-14`
- Standard section block: `py-10 sm:py-12`

Use the shared primitives in `app/components/page-chrome.tsx` instead of retyping near-duplicates:

- `PageShell`
- `PageInset`
- `PageHeader`
- `PageSection`

If a page is drifting from the system, fix it by adopting these primitives first.

## 7) Divider and Border Rules

- Borders are structural and should span the full width of the framed page area.
- Do not inset divider lines accidentally by putting page padding on the outer `main` when the border belongs to the section or header.
- Major page divisions should usually use `border-b border-black`.
- Lists, directories, and split layouts should use explicit row separators and column rules.
- Prefer borders over soft shadows for hierarchy.

This was a real source of dissonance in the codebase. Treat full-width editorial rules as a non-negotiable.

## 8) Navigation and Footer

- Navbar is a segmented ruled bar, not a floating app shell.
- Desktop nav uses bordered segments and dropdown panels.
- Mobile nav uses a bordered collapsing menu with section headers.
- Active nav state uses inversion: black background, white text.
- Footer must align with the same page width and gutter rhythm as the main content shell.

When changing nav/footer, preserve the existing editorial bar logic.

## 9) Buttons and Links

Primary action pattern:

- white surface
- black border
- uppercase micro label
- invert to black background / white text on hover and focus

Use shared action classes from `page-chrome.tsx` when possible:

- `pageActionClassName`
- `pageActionCompactClassName`

All internal route navigation should use `TransitionLink`.

## 10) Motion

- Route transitions currently use `next-view-transitions` through `TransitionLink` and `ViewTransitions`.
- Do not document or rebuild the old curtain/pixel-grid transition unless the user explicitly wants that system restored.
- Motion should stay crisp and minimal.
- Typical durations: `150ms` for state changes, `200-300ms` for menu/card motion.

## 11) Page Composition Rules

Default page composition:

- eyebrow
- title
- optional restrained description
- full-width ruled separation
- sections below with consistent gutters and section spacing

Good repeated patterns in this codebase:

- ruled section stacks
- split grids with a narrow index/meta column
- bordered list directories
- framed data blocks

Bad pattern to introduce during cleanup:

- arbitrary new sidebars
- invented roster counters
- explanatory filler paragraphs not asked for by the user
- decorative wrappers that change the information architecture

## 12) Content Discipline

This is critical.

- Do not add new narrative copy to “improve” a page unless the user asked for copywriting.
- Do not add explanatory blurbs, summaries, labels, counters, badges, or side modules just because a page feels empty.
- Do not change the meaning or framing of a page during a styling pass.
- If the task is visual consistency, preserve the existing content model and standardize spacing, borders, sizing, and alignment only.

If you think a page needs extra structure, ask first or make the smallest possible structural change that is already implied by existing site patterns.

## 13) How to Do Consistency Passes

Preferred order:

1. Read `page-chrome.tsx`, the target page, and a neighboring page that already feels on-system.
2. Identify whether the problem is spacing drift, border drift, typography drift, or content-structure drift.
3. Standardize using shared primitives and shared classes.
4. Avoid introducing any new content or layout concepts unless required.
5. Build and verify.

If multiple pages share the same near-duplicate classes, extract a reusable primitive instead of patching each one differently.

## 14) Guardrails

- Do not replace the border-led hierarchy with generic card-heavy UI.
- Do not add accent colors casually.
- Do not introduce trendy product-design patterns that break the editorial tone.
- Do not add new page copy during a design pass unless asked.
- Do not let divider lines become inset when the rest of the site uses full-width section rules.
- Do not create one-off layout exceptions when the shared page chrome can solve the issue.

## 15) Pre-Completion Checklist

Before handing off, verify:

- Page frame is `max-w-[1200px]` with `border-x border-black`
- Header and section gutters match the system
- Divider lines span the correct full width
- Eyebrow/meta labels use the established uppercase microtype
- Actions use the existing inversion pattern
- Internal links use `TransitionLink`
- No unnecessary new copy or structural modules were introduced
- `npm run build` passes

If you changed a page and also changed what it says, you probably overstepped unless the user explicitly asked for content changes.