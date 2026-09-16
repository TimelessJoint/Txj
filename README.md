# TXJ / TIMELESS JOINT

GitHub Pages-ready static clothing store website.

## Files
- `index.html` — main website entry point
- `style.css` — site styling and responsive layout
- `script.js` — product catalog, search, cart, local storage and WhatsApp checkout
- `assets/` — all local image assets
- `.nojekyll` — prevents GitHub Pages from applying Jekyll processing

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload **the contents of this folder** so `index.html` is in the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`, then save.
6. GitHub will provide the published Pages address.

## Notes
- The site uses relative asset paths, so it works from the repository root on GitHub Pages.
- Google Fonts are loaded from Google Fonts when the visitor is online.
- The shopping cart uses browser `localStorage`.
- Checkout opens WhatsApp using the number configured in `script.js`.
