# Page Lumber Sign Studio

Standalone HTML/CSS/JavaScript rebuild of the Page Lumber Sign Gallery.

## Files

- `index.html` — public gallery and sign editor
- `styles.css` — UI, template layouts, and print styling
- `templates.js` — seven sign template definitions
- `app.js` — gallery, editor, text fitting, local working copies, print/PDF workflow
- `admin.html` — simple local template visibility/order controls
- `admin.js` — admin behavior

## Run it in Visual Studio Code

### Easiest
1. Unzip the project.
2. Open the folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Right-click `index.html`.
5. Choose **Open with Live Server**.

You can also double-click `index.html`, although Live Server is better during development.

## Current templates

- Clearance V2 — 11 × 8.5 in
- Closeout V1 Copy — 11 × 8.5 in
- Essentials Sign — 11 × 8.5 in
- Closeout V1 — 11 × 8.5 in
- New Product Sign V3 — 11 × 8.5 in
- Clearance — 11 × 8.5 in
- XL Clearance Sign — 17 × 11 in

## Editing signs

Open a template and click directly on editable text.

The editor:
- keeps the sign at a fixed physical ratio
- auto-reduces type when content becomes too long
- clips remaining overflow rather than expanding the layout
- preserves working edits in browser localStorage
- allows Reset to restore master template text

Edits never modify the template definition in `templates.js`.

## Print and PDF

Both Print and Save PDF use the browser's native print engine.

For best PDF output:
- Destination: Save as PDF
- Scale: 100%
- Margins: None / 0
- Background graphics: On
- Use the page size specified by the template

The app injects an `@page` rule for 11 × 8.5 in or 17 × 11 in before printing.

## Fonts

The project currently references:

`https://use.typekit.net/nck7spb.css`

The intended fonts are:
- Overpass
- Overpass Mono

Do not package or redistribute font files unless your font license explicitly allows it.

## Important limitation: Admin

`admin.html` is only a convenience interface for a static site.

It stores template visibility/order settings in `localStorage`, meaning:
- settings apply only to the current browser/device
- there is no real login
- the route is not actually secure

For a production company site, admin/template management should eventually use:
- authenticated hosting
- a database or CMS
- server-side access control

## Customize template artwork

All artwork is defined in CSS and `templates.js`.

Each template object has:
- `id`
- `name`
- physical size
- CSS class
- HTML content

Template-specific CSS begins under the `SIGN TEMPLATE BASE` section in `styles.css`.

## Brand colors

The recreated project uses easily editable CSS variables at the top of `styles.css`.
Because the original hosted source was unavailable, confirm these colors/layout details against your original sign artwork before production deployment.
