# AutoImperia

A lightweight, responsive car dealership concept. Built with HTML, CSS, and vanilla JavaScript; no dependencies or build step.

## Run

Run `python -m http.server 8000` in this folder, then open http://localhost:8000.

## Features

- Responsive editorial design, subtle animations, reduced-motion support.
- Search, make/body/price filters, price/year sorting, saved favourites.
- Vehicle detail dialogs and a local garage to add or edit cars, mark them sold/available, and remove cars with persistent undo.
- Browser persistence with graceful handling of unavailable storage.
- Keyboard-accessible native dialogs and labeled controls.

## Hosting

Publish the `main` branch root through GitHub Settings → Pages → Deploy from a branch. No custom domain or paid hosting is needed.

### RepoRun

The repository also includes `Dockerfile`, `docker-compose.yml`, and `stack.yml` for the university RepoRun platform. Configure the repository on branch `main`, with path `/`, then Validate and Deploy. The `web` service serves the site on port 8080 using unprivileged Nginx, limited to 0.25 CPU and 128 MB of memory. The primary `app` endpoint is public, matching the existing GitHub Pages site. RepoRun manages ingress, so no host ports or custom networks are configured.

## Scope

This is a front-end demonstration, not a transactional dealership platform. Initial listings and prices are illustrative. Changes and saved cars are stored only in the current browser's localStorage; they do not update the public repository or other visitors. There is no authentication, backend, payment collection, reservation system, or enquiry delivery. For shared inventory, edit `initialCars` in `app.js` and publish the change, or add an authenticated backend before using this as a real dealership.

Photography is loaded from Unsplash; typography from Google Fonts. Images are illustrative rather than verified photos of the described model. A local inline SVG fallback appears if an image cannot load. No analytics or tracking scripts are included.


## Presentation website assignment

| Requirement | Implementation |
| --- | --- |
| Basic company information | About section, speciality, location, values |
| Team/employees | Three fictional staff profiles and roles |
| Services | Buying, selling/trade-in, viewing/test-drive concepts |
| Contact information | Demo location, reserved example email, sample hours, clearly unconfigured telephone |
| Contact form | Required name/email/message, validation, acknowledgement, enquiry preview and text-file download; no server delivery |
| News/blog | Three dated entries with full articles in accessible dialogs |
| Language | English only; Bulgarian support removed at the project owner’s request |
| Cookies/privacy | Essential-only storage acknowledgement, reopenable settings, storage and external-provider disclosure |
| Detailed entity-specific information | Car specifications, filters, shortlist, editable garage, removal/undo, FAQs |
| Responsive/accessibility | Mobile navigation, labeled fields, semantic sections, keyboard dialogs, reduced motion |

The business, team and contact details are illustrative. Replace them with verified details and connect an appropriate contact delivery service before using this as a real dealership website. Cookie settings use localStorage, not tracking cookies. Garage data and the storage acknowledgement remain available as essential feature storage. External photos and fonts still load as disclosed. Contact contents are never stored in localStorage or sent to a server.
