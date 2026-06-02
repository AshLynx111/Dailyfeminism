# Purple Homepage Redesign

## Goal

Redesign the homepage entrance around a purple, black, and white collage style inspired by the provided reference images. The page should feel like a feminist digital archive poster: high contrast, graphic, layered, and tactile.

## Scope

- Update only the homepage entrance section.
- Keep the existing scroll target and exhibition flow.
- Use the two existing local collage images as primary visual assets.
- Remove remote decorative image dependencies from the entrance so the first screen loads reliably.
- Give the `START` action a dedicated bottom safe area so it does not overlap background fragments.

## Visual Direction

- Base palette: near-black, white, grayscale, and saturated violet.
- Treat the reference images as cut-paper collage layers with grayscale filters, purple overlays, violet bars, rings, stamps, dotted textures, and archival text fragments.
- Keep the large `DAILY / FEMINISM` title, with white filled display type and violet outlined type.

## Implementation Notes

- Replace `figma:asset` imports in the entrance with explicit local imports from `src/imports`.
- Keep layout stable across desktop and mobile through responsive `clamp()` values and bounded image containers.
- Position the `START` button above a bottom fade/safe strip with its own dark button treatment.

## Verification

- Run a production build.
- Start the Vite dev server and inspect the first viewport at desktop and mobile sizes.
