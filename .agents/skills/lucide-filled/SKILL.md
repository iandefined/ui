---
name: lucide-filled
description: >-
  Author and refine standalone Filled variants of canonical Lucide icons while
  preserving Lucide's exact outer footprint, rounded stroke language, internal
  rhythm, open seams, and optical negative-space balance. Use when creating or
  reviewing Filled icons for Lucide Variants.
---

# Lucide Filled Icon Authoring

Create polished standalone **Filled** variants of canonical Lucide icons.

The canonical Lucide icon is the source of truth.

A Filled variant must look like the **same Lucide icon with solid mass added inside its existing geometry**.

It must preserve:

- the same 24×24 coordinate system
- the same visible outer footprint
- the same overall proportions
- the same visual center
- the same rounded design language
- the same semantic feature placement
- the same stroke rhythm
- the same family resemblance at 16–32px

Core principle:

> **Same footprint. Same roundness. Same stroke rhythm. Different mass.**

Do not redesign Lucide.
Do not resize Lucide.
Do not let the Filled variant become a generic solid icon that merely resembles Lucide.

# Non-Negotiable Guardrails

## 1. Outer Size Is Immutable

The canonical Lucide icon rendered with its standard `2px` stroke defines the visible outer footprint.

The Filled variant must not:

- extend beyond that visible boundary
- shrink noticeably inside that boundary
- change width or height
- shift the visual center
- move detached details
- alter major outer curves

A Filled icon that looks smaller than Outline is incorrect.
A Filled icon that looks larger than Outline is incorrect.

Target:

```text
same outer footprint
+
different interior treatment
```

## 2. White-Space Seams Are Inverse Lucide Strokes

Any negative-space seam derived from an original Lucide stroke must preserve the original stroke's:

- centerline
- visual weight
- curvature
- round caps
- round joins
- path direction
- semantic role

Think:

> **transparent Lucide stroke**

not:

> **custom polygon cutout**

## 3. Open Seams Must Actually Open

If the source feature reaches the edge of the object, the subtractive seam must continue through the Filled silhouette.

Do not leave:

- a thin filled bridge
- a bottom line
- a hairline strip
- anti-aliasing residue

between the seam and the outer edge.

## 4. Internal Negative Space Is Optically Tuned

Outer geometry is strict.

Internal negative space may require small optical adjustment so the Filled variant has the same perceived balance as Outline.

This is especially true for:

- map-pin holes
- eye openings
- ring centers
- envelope seams
- small apertures

Do not blindly use the smallest mathematically possible cutout.

# Canonical Asset Format

Every Filled icon must be a standalone SVG.

Preferred structure:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  <path d="..." fill="currentColor" />
</svg>
```

Do not require:

- external CSS
- CSS classes
- scripts
- runtime props
- hard-coded visible colors
- gradients
- decorative filters
- global scale transforms

All visible icon color derives from `currentColor`.

# Canonical Lucide Geometry Is Reference Data

Before authoring a Filled variant, inspect the actual current Lucide SVG.

Do not work from memory.

Record:

- canonical path geometry
- rendered outer bounds
- stroke width
- line caps
- line joins
- internal stroke paths
- holes
- open seams
- detached details
- relative spacing

# The Rendered Stroke Envelope

Lucide's canonical strokes are centered on their paths.

For `stroke-width="2"`, the visible stroke extends approximately 1 SVG unit on either side of the path centerline.

Therefore:

```text
path centerline != visible outer edge
```

A Filled silhouette built only to the path centerline will look too small.

Correct model:

```text
canonical path
    ↓
2px rounded stroke
    ↓
visible rendered envelope
    ↓
Filled outer silhouette
```

The Filled outer silhouette should match the canonical rendered envelope without exceeding it.

# Hard Footprint Acceptance Test

At 24px, determine the canonical rendered:

```text
top
right
bottom
left
```

These are both hard maximum bounds and target visual extents.

Reject the Filled variant if:

- a major outer edge is visibly farther inward
- a major outer edge crosses outside the source
- the whole icon looks smaller
- the whole icon looks larger
- a detached detail moves
- visual centering changes

Repeat at 16px.

# No Global Scaling or Translation

Never solve a geometry issue with:

```xml
transform="scale(...)"
transform="translate(...)"
```

Never change `viewBox`, `width`, or `height` to compensate.

Fix the actual paths.

# Semantic Geometry Model

Classify each icon into:

1. **OUTER ENVELOPE**
2. **MATERIAL**
3. **STRUCTURAL SEAM**
4. **TRUE VOID**
5. **DETACHED DETAIL**

# 1. Outer Envelope

The outer envelope is the canonical rendered outside edge.

Preserve it closely enough that Outline and Filled feel exactly the same size.

Do not redraw it from memory.

Preserve:

- corners
- shoulders
- arcs
- tips
- tabs
- side extents
- top/bottom extents

# 2. Material

Material is the visual body that becomes solid.

Examples:

- house body
- folder body
- envelope body
- bell body
- shield
- document
- card
- map-pin shell

Material uses:

```xml
fill="currentColor"
```

Fill the available mass inside the canonical outer envelope.

Do not change outer size to compensate for internal negative space.

# 3. Structural Seam

A structural seam is an original Lucide stroke that defines a feature but is not a true isolated hole.

Examples:

- envelope flap
- house door outline
- calendar divider
- briefcase lid
- bell rim
- folder division

Structural seams become transparent stroke-shaped channels.

Mental model:

```text
canonical visible stroke
→
transparent stroke with the same visual language
```

# Structural Seam Width

For canonical `stroke-width="2"`, start with a white-space seam that visually reads like a `2px` Lucide stroke.

Preferred range:

```text
1.75–2.0 SVG units
```

Do not reduce below `1.75` merely to preserve more material.

Do not increase above `2.0` merely to make the seam easier to see.

Any exception requires direct overlay evidence.

# Round Caps Are Mandatory

Lucide uses `stroke-linecap="round"`.

Any inverse stroke must therefore terminate with visible roundness.

Never create:

- flat ends
- square ends
- pointed ends
- clipped diagonal ends

This especially applies to the two outer ends of an envelope flap seam.

# Round Joins Are Mandatory

Lucide uses `stroke-linejoin="round"`.

Connected negative-space seams must preserve that appearance.

Never turn a rounded join into:

- a sharp V
- a pointed miter
- a triangular notch
- an angular polygon join

The `mail` center join is a required reference case.

# Curvature Is Mandatory

If the canonical source is curved:

```text
curve → curved negative space
```

Do not replace it with a straight segment, pill, rectangle, or rough polygon.

Preserve canonical arcs and bends.

# Open Seams vs Closed Cutouts

## Open Seam

An open seam represents structure that reaches the edge of the object.

Examples:

- house doorway legs
- some container openings
- edge-connected separators

The subtractive geometry must pass through the Filled silhouette edge.

## Closed Cutout

A closed cutout represents a true hole fully surrounded by material.

Examples:

- map-pin center
- ring center
- socket
- aperture

Do not confuse these.

# Open-Seam Overshoot Rule

When an open negative-space seam reaches the outer silhouette, do **not** stop the subtractive geometry exactly on the boundary.

Exact contact can leave:

- a 1px filled bridge
- a thin line
- anti-aliasing residue
- a rounded cap visibly inside the object

Instead, overshoot the subtractive geometry beyond the Filled boundary.

For a seam around `2` SVG units wide:

```text
recommended overshoot beyond the silhouette:
at least 1.25 SVG units
```

or enough to guarantee the cut is fully open at all target sizes.

This is allowed because subtractive geometry adds no visible content.

# House Rule

The house is the reference icon for open seams.

For Filled `house`:

- preserve the canonical house outer footprint
- preserve roof and wall geometry
- preserve the canonical door centerline
- preserve canonical door width
- preserve canonical door height
- preserve rounded door top corners
- use approximately the canonical stroke width for the negative-space door structure
- let both vertical door sides exit through the bottom silhouette

## No Bottom Door Line

The doorway must **not** have a bottom horizontal line.

Do not create a closed U-shaped hole with a bottom edge.

Do not allow the subtraction to terminate exactly at the house bottom.

The two vertical doorway cuts should extend beyond the bottom edge.

The bottom remains fully open.

## House Rejection Rules

Reject if:

- any visible line appears across the bottom of the doorway
- a filled bridge remains under the doorway
- the doorway is enclosed
- doorway legs have rounded caps visible inside the house bottom
- door dimensions exceed the canonical feature
- door top loses Lucide roundness

# 4. True Void

A true void is actual empty space.

Examples:

- map-pin center
- ring center
- eye aperture
- chain opening
- socket

True voids should remain transparent.

Their optical size matters.

# True-Void Optical Weight

A Filled body is visually heavier than an Outline body.

Because of this, a mathematically matched hole can sometimes **look smaller** in Filled.

For true voids, compare perceived negative-space weight side by side with Outline.

If the hole feels too small:

- enlarge it slightly
- keep it centered on the canonical feature
- preserve its shape
- do not alter the outer icon

Typical optical adjustment:

```text
+0.25 SVG units per side
```

then re-check.

A larger change requires direct visual evidence.

# Map Pin Rule

The map pin is the reference icon for true-void optical correction.

For Filled `map-pin`:

- preserve exact canonical outer footprint
- preserve pin tip
- preserve upper curvature
- keep the hole centered on the canonical center
- preserve circular roundness
- compare the transparent hole to the visible negative space in Outline

If the Filled hole looks smaller than the Outline's center opening:

> enlarge the hole slightly until the **perceived negative-space weight** matches.

Do not keep an undersized hole merely because its coordinates are mathematically convenient.

The Filled hole should never look like a tiny dot when Outline clearly reads as a substantial circular opening.

# 5. Detached Detail

Detached details include:

- bell clapper
- notification marks
- baselines
- small accents
- separated modifiers

Preserve:

- source position
- source visual size
- source curvature
- spacing from body
- stroke weight

If converting a detached detail to a fill makes it less faithful, keep the canonical stroke.

# Mail Rule

The `mail` icon is the reference icon for:

- seam stroke width
- round caps
- round joins
- endpoint padding
- harmonic side-wall spacing

For Filled `mail`:

- preserve exact canonical envelope outer bounds
- preserve outer corner radius
- preserve flap direction and centerline
- preserve the center V position
- use a white-space seam visually equivalent to the canonical `2px` stroke
- use round caps on both outer seam endpoints
- use a round join at the center
- do not create a sharp polygonal V
- do not let the seam terminate too close to the outer edge

# Mail Endpoint Padding Rule

The two outer ends of the flap seam need visible Filled material between the round seam cap and the envelope's outside edge.

Do not let the negative-space seam nearly touch or bite into the side wall.

Use:

```text
distance from seam cap to outer edge
>= seam width
```

Preferred target:

```text
side padding ≈ 1.0–1.25 × seam width
```

For a `2`-unit seam:

```text
target side padding ≈ 2–2.5 SVG units
```

Measure this optically from the end of the rounded cap to the visible outer boundary.

This is a Filled-specific optical adjustment.

Outer envelope geometry remains canonical.

The flap seam endpoints may be inset slightly from the original stroke endpoints if necessary to preserve this harmonic padding.

# Mail Harmonic Balance Rule

Evaluate:

```text
left side wall
right side wall
top material
bottom material
flap seam width
flap endpoint padding
```

as one composition.

The seam should:

- read as a Lucide-weight stroke
- have round caps
- have a round center join
- have breathing room on both sides
- not visually squeeze the envelope

Reject if:

- the seam looks clipped at either side
- either endpoint looks square
- the V join looks sharp
- side padding is less than seam width
- seam feels too close to the outer boundary
- envelope looks compressed

# Mail Preferred Construction Strategy

Do not manually carve a sharp V polygon.

Instead, derive the seam from a round-stroked path conceptually equivalent to:

```text
left endpoint
→ center
→ right endpoint
```

with:

```text
stroke width ≈ 2
round cap
round join
```

Then subtract that rendered stroke envelope from the Filled body.

This produces:

- naturally rounded endpoints
- a naturally rounded center
- consistent stroke width

If boolean/path conversion is used, inspect the result afterward to ensure roundness survived.

# Bell Rule

For Filled `bell`:

- preserve canonical outer bounds
- preserve shoulder curves
- preserve lower body curvature
- preserve canonical bottom extent
- preserve the lower detail/clapper position
- preserve clapper curvature

Do not replace the clapper with a generic pill.

Keep the original rounded stroke if it remains more faithful.

# Folder Rule

For Filled `folder`:

- preserve exact outer width and height
- preserve tab position
- preserve tab proportions
- preserve canonical roundness
- do not shrink body inward
- do not enlarge tab

# Container Enclosure Icons: Enclosed vs. Escaping Features

A crucial distinction exists for icons featuring a geometric container (`square-*`, `circle-*`) with directional arrows:

## 1. Fully Enclosed Arrows (Fill the Container, Cut Out the Arrow)

When the arrow or internal feature is **fully contained within** the enclosure boundary (e.g., `square-arrow-down`, `square-arrow-up`, `square-arrow-down-left`, `square-arrow-down-right`, `circle-arrow-down`, `circle-arrow-left`):

- Solidify the outer container (`<rect width="18" height="18" x="3" y="3" rx="2" fill="currentColor" />` or `<circle cx="12" cy="12" r="10" fill="currentColor" />`)
- Subtract the arrow from the solid mass as an inverse white-space seam using a `<mask>` or compound path
- The inverse arrow stroke must preserve Lucide's 2px weight, rounded caps, and rounded joins

## 2. Escaping / Outward Features (The Arrow-Out Rule: Do NOT Fill)

When an icon represents an arrow or feature **emerging, escaping, or breaking out** across the container boundary (e.g., `circle-arrow-out-*`, `square-arrow-out-*`, `square-arrow-right-exit`, `square-arrow-right-enter`):

> **Do NOT force a filled variant.**

Solidifying the container behind an escaping arrow produces an unnatural, unbalanced shape (such as a solid pacman wedge or an amputated box) where the arrow either looks awkwardly detached or half-submerged into the solid mass.

**Required Treatment**:
- Revert the Filled variant to the **exact canonical Lucide outline stroke** (identical to the base icon, root `fill="none"` with `stroke="currentColor"`).
- Never invent custom chamfered polygons or solid wedge silhouettes for arrow-out icons.

# Mostly Linear & Alphanumeric Icons

Some Lucide icons have no meaningful closed solid body:

- Pure directional arrows (`arrow-right`, `arrow-down-up`, `arrow-left-right`)
- Chevrons (`chevron-right`, `chevrons-up-down`)
- Sorting and ranking arrows with characters (`arrow-down-0-1`, `arrow-down-a-z`, `arrow-up-z-a`)
- Tools without a solid material body (e.g., `search`)
- Controls, sliders, and separators

For these icons:

> **The Filled variant must be identical to the canonical Lucide outline stroke.**

Do not invent arbitrary solid blobs, filled backgrounds, or fake silhouettes. If there is no natural material body to fill, preserve the stroke.

# Copy & Overlapping Layer Rule

Icons depicting stacked or overlapping sheets/surfaces (such as `copy`, stacked documents, and layered cards) require deliberate negative-space separation in their Filled variant.

When multiple solid layers overlap:
- Do **not** allow the solid shapes to simply touch or merge into a single indistinct silhouette.
- Separate overlapping layers with an **inverse whitespace line (negative-space seam)** that matches the visual width of a standard Lucide stroke: **`2px`** (or 2 SVG units).

## Mask Geometry for 2px Seams

When using an SVG mask on the background layer:
1. The foreground layer is drawn with canonical rounded stroke (`stroke-width="2"` and `stroke-linejoin="round"`), which extends 1 SVG unit outward from its path centerline.
2. To achieve an exact 2px uniform whitespace gap around the foreground layer, expand the black subtractive cutout on the background layer by using `stroke-width="6"` with matching `stroke-linejoin="round"` on the same path:
   ```xml
   <defs>
     <mask id="copy-filled-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
       <rect width="24" height="24" fill="white" />
       <rect width="14" height="14" x="8" y="8" rx="2" ry="2" fill="black" stroke="black" stroke-width="6" stroke-linejoin="round" />
     </mask>
   </defs>
   <rect width="14" height="14" x="2" y="2" rx="2" ry="2" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" mask="url(#copy-filled-mask)" />
   <rect width="14" height="14" x="8" y="8" rx="2" ry="2" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
   ```
3. The math:
   - Foreground outer edge: `path + 1px`
   - Cutout outer edge: `path + 3px`
   - Resulting negative-space gap: `3px - 1px = 2px`
4. This produces a perfectly uniform 2px whitespace gap along straight edges AND concentric rounded corner arcs (`rx=2`), maintaining exact Lucide stroke rhythm and corner continuity.

# Settings & Mechanical Center Aperture Rule

For icons with mechanical apertures, axle holes, or center openings (e.g. `settings` center hole `r=3`):
- The center hole is a **True Void**, not material.
- It must remain completely transparent in the Filled variant.
- Use `fill-rule="evenodd"` on the filled path to carve out the aperture, preserving the canonical outline hole with its 2px stroke border:
  ```xml
  <path
    d="M9.671 4.136... M 15 12 a 3 3 0 1 0 -6 0 a 3 3 0 1 0 6 0 Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill-rule="evenodd"
  />
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none" />
  ```

# Catalog Metadata Standards: Categories & Aliases (Non-Negotiable)

When registering any icon in `src/icons/catalog.ts`:

## 1. Upstream Lucide Categories (Mandatory)

Always inspect the official upstream Lucide icon JSON (`https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/<name>.json`):
- **Use the canonical Lucide category** (`categories[0]`).
- Never invent arbitrary categories or force icons into an artificial subset.
- For example:
  - `settings` → `"account"` (not "navigation")
  - `star` → `"account"`
  - `bookmark` → `"account"`
  - `user` → `"account"`
  - `minus` → `"math"`
  - `copy` → `"text"`
  - `moon` → `"accessibility"`
  - `heart` → `"medical"`
  - directional arrows / chevrons → `"arrows"`
  - alphanumeric sorting arrows (`arrow-down-0-1`, `arrow-down-a-z`) → `"text"`

## 2. Upstream Lucide Tags & Aliases (Mandatory & Non-Negotiable)

The `tags` array in `ICON_CATALOG` powers the search bar and alias badges:
- **Include ALL original Lucide tags first**: You MUST copy the exact tags from the official Lucide icon metadata (`tags` array in `icons/<name>.json`).
- **Additional aliases**: You may add your own interpretations, synonyms, and directional descriptors after the original tags, but the official Lucide tags are non-negotiable.
- Always include the canonical icon name as well.

# Visual Harmonic Consistency

A good Filled icon must preserve:

```text
geometric fidelity
+
stroke rhythm
+
negative-space rhythm
```

Evaluate relationships rather than isolated numbers.

Compare:

- outer body mass
- seam width
- side-wall thickness
- hole diameter
- endpoint padding
- detached-detail spacing

The icon should feel as though every part belongs to the same Lucide stroke system.

# Overlay Validation Is Mandatory

Every Filled icon must be overlaid against canonical Lucide.

Use identical:

- `viewBox`
- width
- height
- origin
- alignment

Temporary QA colors may be used.

## Overlay Check 1: Outer Footprint

At 24px verify:

- same top extent
- same bottom extent
- same left extent
- same right extent
- no Filled geometry beyond source
- no visible Filled shrinkage

Repeat at 16px.

## Overlay Check 2: Internal Feature Alignment

Verify:

- house door aligns
- mail flap aligns semantically
- map-pin hole remains centered
- bell detail aligns
- folder tab aligns

Optical internal adjustments may change size slightly, but should not move the feature's center or semantic placement.

## Overlay Check 3: Stroke-Weight Parity

For structural seams:

- compare Outline's rendered stroke width
- compare Filled's negative-space seam width

Reject if clearly mismatched.

Mandatory for `mail`.

## Overlay Check 4: Roundness

Inspect:

- caps
- joins
- curves
- corner radii
- detached details

Reject sharp substitutions for round source geometry.

## Overlay Check 5: Open-Edge Behavior

Inspect any seam that reaches the silhouette boundary.

Verify:

- it passes fully through the edge
- no filled bridge remains
- no anti-aliased line remains
- no rounded cutout cap remains visible at the boundary

Mandatory for `house`.

# Side-by-Side Validation Is Mandatory

After overlay, compare:

```text
Outline | Filled
```

at:

- 16px
- 20px
- 24px
- 32px

When Duotone exists:

```text
Outline | Duotone | Filled
```

Evaluate:

- perceived size
- visual center
- seam weight
- hole weight
- roundness
- side padding
- overall balance

Overlay catches geometric drift.

Side-by-side catches optical imbalance.

Both are required.

# Rejection Rules

Reject immediately if:

## Size

- Filled looks smaller than Outline
- Filled looks larger than Outline
- visible Filled geometry crosses source bounds
- major outer edges sit noticeably inward

## House

- doorway has a bottom line
- doorway cutout does not pass through bottom edge
- bottom contains a thin fill bridge
- door legs end with visible round caps inside the body

## Mail

- flap seam endpoints are not rounded
- center join is sharp
- seam is clearly thinner than Lucide stroke weight
- seam is clearly thicker than Lucide stroke weight
- endpoint padding is less than seam width
- flap looks cramped against side edges
- envelope looks visually compressed

## Map Pin

- center hole looks like a tiny dot
- hole looks optically smaller than Outline
- hole moves off canonical center

## General

- rounded source geometry becomes angular
- curves become generic pills
- detached detail spacing changes
- icon only works after a global transform

## Containers with Escaping Features

- creating a solid container silhouette behind an arrow that exits or enters the enclosure (`circle-arrow-out-*`, `square-arrow-out-*`, `square-arrow-right-exit`)
- solidifying containers into pacman wedges or chamfered polygons

## Linear & Alphanumeric Icons

- creating arbitrary solid blobs or artificial silhouettes for icons without a natural material body (e.g., pure arrows, chevrons, `search`, `arrow-down-0-1`, `arrow-down-a-z`)

# Authoring Workflow

For every icon:

1. Load the actual canonical Lucide SVG.
2. Render it with `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.
3. Record rendered outer bounds.
4. Classify internal geometry as `MATERIAL`, `STRUCTURAL SEAM`, `TRUE VOID`, `DETACHED DETAIL`, or `OPEN SEAM`.
5. Build Filled material to the canonical rendered envelope.
6. Recreate structural seams as transparent inverse strokes near 2 SVG units wide.
7. Extend open seams beyond the silhouette enough to eliminate residual lines.
8. Add true voids and optically enlarge them slightly when the heavier Filled mass makes them look too small.
9. For mail-like seams, ensure endpoint padding is at least one seam width.
10. Overlay at 24px.
11. Overlay at 16px.
12. Compare Outline | Filled side by side at 16, 20, 24, and 32px.
13. Reject until size, roundness, seam weight, open-edge behavior, and negative-space balance all match.

# Acceptance Checklist

## Footprint

- [ ] same 24×24 viewBox
- [ ] same perceived width as Outline
- [ ] same perceived height as Outline
- [ ] no visible shrinkage
- [ ] no visible expansion
- [ ] no global transforms

## Structural Seams

- [ ] seam follows source geometry
- [ ] seam reads near canonical 2px weight
- [ ] round caps preserved
- [ ] round joins preserved
- [ ] curves preserved

## Open Seams

- [ ] edge-connected seams are truly open
- [ ] cutout overshoots the silhouette when needed
- [ ] no residual fill bridge
- [ ] no bottom line artifact
- [ ] no cap artifact at the edge

## Mail

- [ ] flap seam endpoints are round
- [ ] center join is round
- [ ] seam weight matches Lucide language
- [ ] each endpoint has at least one seam-width of side padding
- [ ] side walls retain sufficient mass
- [ ] envelope does not look compressed

## House

- [ ] doorway dimensions remain source-derived
- [ ] doorway top is rounded
- [ ] vertical sides remain open through bottom edge
- [ ] no bottom doorway line

## Map Pin

- [ ] hole remains centered
- [ ] hole is circular
- [ ] hole's perceived size matches Outline
- [ ] hole is optically enlarged slightly if Filled mass makes it look too small

## Overlapping Layers (Copy, Stacked Sheets)

- [ ] overlapping shapes do not touch or merge into a blob
- [ ] whitespace line separating layers has exact 2px visual width
- [ ] mask cutout matches foreground corner radius concentrically

## Validation

- [ ] overlay at 24px
- [ ] overlay at 16px
- [ ] side-by-side at 16px
- [ ] side-by-side at 20px
- [ ] side-by-side at 24px
- [ ] side-by-side at 32px

# Final Principle

The Filled variant must feel like a native Lucide weight, not a different icon family.

> **Preserve the source footprint. Preserve the source roundness. Preserve the source stroke rhythm. Open seams must truly open. True voids must retain enough optical weight.**

For white-space seams:

> **Think "transparent rounded Lucide stroke."**

For openings that reach an edge:

> **Subtract through the edge, not up to the edge.**

For true holes:

> **Match perceived negative-space weight, not merely convenient coordinates.**
