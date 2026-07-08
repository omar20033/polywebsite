# blog-site

## Structure
```
blog-site/
├── index.html          ← homepage, shows the card grid
├── about.html           ← example static page
├── posts.json           ← add your blog entries here
├── posts/
│   ├── what-is-a-polymarket-price.html
│   ├── do-i-need-to-hold-until-resolution.html
│   └── trader-profile-fade-the-spike.html
├── partials/
│   ├── navbar.html       ← edit once, updates everywhere
│   └── footer.html
├── css/style.css
└── js/
    ├── icons.js          ← shared thumbnail icon library
    ├── include.js        ← injects navbar/footer into every page
    ├── posts.js          ← builds cards + featured post from posts.json
    ├── toc.js            ← auto-builds the sticky Table of Contents from a post's <h2>s
    └── related.js        ← builds the Related Articles section from posts.json
```

## Adding a new post
1. Duplicate a file in `posts/` and edit its `<h1>`, `.post-meta`, and `.post-body`.
2. Add one entry to `posts.json`:
```json
{
  "title": "Your title",
  "file": "posts/your-file.html",
  "category": "beginner",   // or "strategy"
  "thumb": "coin",          // "coin", "ledger", "chart", or "profile"
  "date": "2026-07-01",
  "excerpt": "One or two sentences for the card."
}
```
That's it — the homepage card grid and the filter tabs read straight from `posts.json`.

By default, the newest post (by `date`) is shown as the big featured story at the top of the
homepage. To pin a specific post there instead, add `"featured": true` to its entry.

## Table of Contents (post pages)
Each post page has a sticky left sidebar with a Table of Contents. You don't maintain this by
hand — `js/toc.js` scans the post's `<h2>` headings, builds the list, and highlights whichever
section is currently on screen as you scroll. Just write `<h2>` tags in your post body as usual
(at least two of them — with fewer, the sidebar hides itself). It collapses below ~900px wide.

## Related Articles (post pages)
At the bottom of every post, `js/related.js` pulls up to 4 other posts from `posts.json`
(newest first, excluding the current post) and renders them as a photo-card grid. Add an
optional `"author"` field to a post's `posts.json` entry to control the byline shown there —
otherwise it falls back to "Polymarket Academy Team".

## Adding a new post (updated)
Each post page needs one extra thing beyond what's described above: set
`data-post-file="posts/your-file.html"` on the `<body>` tag, matching the `file` value you used
in `posts.json`. That's how `related.js` knows to exclude the current post from its own list.

## Editing the navbar or footer
Edit `partials/navbar.html` or `partials/footer.html` once — every page that includes
`<div data-include="navbar"></div>` / `<div data-include="footer"></div>` picks up the change automatically.

## Running it locally
Browsers block `fetch()` on `file://` pages, so `posts.json` and the partials won't load if you
just double-click `index.html`. Serve the folder instead, from inside `blog-site/`:
```
python3 -m http.server 8000
```
then open `http://localhost:8000`. This also matches how it will behave once deployed
(e.g. GitHub Pages), so it's the more accurate way to preview it anyway.
