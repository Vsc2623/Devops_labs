# VSC Linux Code — Professional Website

A responsive, static Linux and DevOps learning portfolio created for **Sagar Chavan**.

## Features
- Responsive navigation and mobile menu
- Three-slide rotating hero banner with manual controls
- Study material cards with category filters
- Kubernetes architecture diagram (inline SVG)
- Quick-reference tabs for Linux, Git, Docker and Bash
- Copy-to-clipboard buttons for commands and email
- Creator and contact sections
- No build step or package installation required

## Run locally
Open `index.html` in a browser, or serve the folder with a static HTTP server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish
Upload the contents of this folder to any static hosting provider such as GitHub Pages, Netlify or an S3 static website bucket.

## Customize
- Creator name and email are in `index.html`.
- Add real GitHub / LinkedIn profile URLs in the contact section when ready.
- Main styling: `assets/css/style.css`
- Carousel, filters, tabs and copy controls: `assets/js/script.js`

This is a learning website and its Kubernetes diagram is a simplified architecture overview, not a production deployment blueprint.
Git pull practice - October 2026
Feature branch lab completed on webserver
