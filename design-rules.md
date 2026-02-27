# Police Force by the Numbers Design Rules

This document codifies the current UI system so future pages/components stay visually consistent.

## 1) Core Direction

- Style: editorial newspaper interface with modern interaction polish
- Mood: serious, analytical, high-contrast, disciplined
- Principle: content-first, with structure and hierarchy communicated through rules, typography, and spacing

## 2) Color System

- Base background: `#ffffff`
- Primary text/rules: near-black (`#050505` globally, with black utility classes in components)
- Selection treatment: black background + white text
- Opacity steps for hierarchy:
`text-black/55`, `text-black/60`, `text-black/65`, `text-black/70`, `text-black/75`, `text-black/80`
- Interaction inversion pattern:
default white surface + black text -> hover/active black surface + white text

## 3) Typography System

- Body/UI font: `Source Sans 3` (`--font-nav`)
- Display/serif font: `Newsreader` (`--font-masthead`)
- Accent/transition font: `Chomsky` (used in route transition identity mark)

### Type Roles

- Metadata label:
`10-12px`, `font-semibold`, `uppercase`, `tracking-[0.14em]` (sometimes `0.15em`)
- Body copy:
`text-sm` or `text-base`, `leading-relaxed`, typically `text-black/75` or `text-black/80`
- Headline tiers:
`text-2xl` to `text-6xl` with tight leading, semibold/medium weight

## 4) Layout and Grid

- Canonical content frame:
`mx-auto w-full max-w-[1200px] border-x border-black`
- Shell:
sticky top navbar, flowing main content, bordered footer
- Section structure:
large blocks separated by hard `border-b border-black`
- Responsive strategy:
single-column default, enhanced split grids at `lg`/`md`

## 5) Rule/Border Language

- Borders are structural, not decorative
- Use 1px black rules to:
segment nav items, split columns, bracket lists, and define cards
- Prefer explicit keylines over shadows for hierarchy
- Exception:
cards may use subtle gradient fills and offset-shadow illusions, but still anchored by black borders

## 6) Spacing Rhythm

- Typical horizontal padding:
`px-6` on mobile, `sm:px-10` on larger screens
- Vertical cadence:
`py-8` to `py-16` depending on section importance
- Internal spacing:
`mt-3`, `mt-4`, `mt-5`, `mt-6` used as a consistent reading rhythm

## 7) Interaction Model

- Primary interaction pattern:
color inversion on hover/focus/active
- Transition durations:
`150ms` for most color/UI state changes
`200-300ms` for menu and card motion
- Motion style:
crisp, minimal, purposeful; no playful bounce or large easing theatrics in components

## 8) Navigation Pattern

- Desktop:
segmented horizontal bar with dropdown blocks
- Mobile:
collapsible index with section headers and ruled list rows
- Active route:
black background + white text
- Overlay behavior:
translucent click-capture layer to close open menus

## 9) Page Composition Pattern

- Page intro block:
small uppercase section label -> large title -> restrained descriptive paragraph
- Content blocks:
split-layout essays, numbered sections, and ruled list indexes
- Lists and indexes:
rendered as editorial directories with top/bottom borders and row separators

## 10) Card Pattern (Team)

- Outer card:
black border with subtle layered/offset hover depth
- Media area:
square image region, grayscale-to-color hover reveal
- Content area:
role label (micro uppercase), masthead-style name, then narrative sections
- Icon actions:
boxed, border-first controls with inversion on hover/focus

## 11) Motion Identity (Route Transition)

- All internal route links use `TransitionLink` to run custom curtain transition
- Curtain style:
pixel-grid cover and reveal in near-black
- Timing:
~420ms cover + ~420ms reveal
- Identity stamp:
centered `PFBN` in `Chomsky` during cover phase
- Accessibility:
respects `prefers-reduced-motion`

## 12) Content Voice Rules

- Tone:
precise, analytical, non-sensational
- Framing:
scope and methodological limits are surfaced early and repeatedly
- UI copy:
short, directive labels (`Open`, `Data`, `Front Page`, `Scope Note`, etc.)

## 13) Reuse Checklist for New Pages

- Use the canonical framed container (`max-w-[1200px]` + `border-x`)
- Start with metadata label + strong headline + constrained lead paragraph
- Maintain uppercase label style (`10-12px`, `tracking ~0.14em`)
- Separate major sections with black keylines
- Keep interactions inversion-based and fast
- Use `TransitionLink` for internal navigation
- Keep colors monochrome except for subtle neutral gradients where needed

## 14) Guardrails

- Do not introduce random accent colors without system-level intent
- Do not replace border hierarchy with soft card-only UI
- Do not mix in playful motion curves/styles that break editorial tone
- Do not use generic default font stacks for core hierarchy

