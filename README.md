# AutoImperia

A lightweight, responsive car dealership concept. Built with HTML, CSS, and vanilla JavaScript; no dependencies or build step.

## Run

Run `python -m http.server 8000` in this folder, then open http://localhost:8000.

## Features

- Responsive editorial design, subtle animations, reduced-motion support.
- Search, make/body/price filters, price/year sorting, saved favourites.
- Vehicle detail dialogs and a local garage to add cars or mark them sold/available.
- Browser persistence with graceful handling of unavailable storage.
- Keyboard-accessible native dialogs and labeled controls.

## Hosting

Publish the `main` branch root through GitHub Settings → Pages → Deploy from a branch. No custom domain or paid hosting is needed.

## Scope

This is a front-end demonstration, not a transactional dealership platform. Initial listings and prices are illustrative. Changes and saved cars are stored only in the current browser's localStorage; they do not update the public repository or other visitors. There is no authentication, backend, payment collection, reservation system, or enquiry delivery. For shared inventory, edit `initialCars` in `app.js` and publish the change, or add an authenticated backend before using this as a real dealership.

Photography is loaded from Unsplash; typography from Google Fonts. Images are illustrative rather than verified photos of the described model. A local inline SVG fallback appears if an image cannot load. No analytics or tracking scripts are included.
