# Happy Birthday, Ryan! 🎁

A birthday surprise for Ryan: a gift box you unwrap one layer at a time, with confetti at the end.

It's a static site made of plain HTML, CSS and vanilla JS. There's no framework, no build step and no backend.

```
index.html   page markup, Open Graph tags, emoji favicon
style.css    all styles and animations
script.js    CONFIG (all the words) + confetti, sound, and layer logic
```

## Editing the content

All text lives in the `CONFIG` object at the top of `script.js`:

- `CONFIG.layers` holds the layers, in order. Each one has a `type` (`wish`, `balloons`, `facts`, `coupon`, `letter`, `lunch`, `finale`) and its own text fields.
- Josh's message is the `letter` layer marked `✏️ Josh: edit your message here`. Each string in `body` is one paragraph.
- `CONFIG.teasers` holds the line shown above the box before each layer.
- `CONFIG.tagLines` holds the tag text on the box after the first layer; it rotates through the list.
- `CONFIG.wraps` holds the wrapping paper and ribbon colors for each layer.

The wish typed into the jar is never saved or sent anywhere. It only exists on screen for the drop animation.

## Test locally

The page has no build step, so any static file server works. From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. With Node installed, `npx serve .` also works.

Things to check:
- Click through all the layers, then press "Open it again".
- Use your browser dev tools' device toolbar to try a phone-sized screen.
- Turn on **Reduce motion** in your OS settings (macOS: System Settings → Accessibility → Display). Animations should become instant and the confetti should stop.
- Use the 🔇 button at the top right to turn sound on. Sound is off by default.

## Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ryan's birthday surprise"
   git branch -M main
   git remote add origin https://github.com/<you>/ryan-birthday.git
   git push -u origin main
   ```
   Create the empty `ryan-birthday` repo on GitHub first. If you have the GitHub CLI, you can instead run `gh repo create ryan-birthday --private --source=. --push`.

2. **Import in Vercel:** go to https://vercel.com/new and import the repo.

3. **Configure:**
   - Framework Preset: **Other**
   - Build Command: leave empty (or turn on the override and leave it blank)
   - Output Directory: leave as the default (the repo root, `.`)
   - Install Command: leave empty

4. **Deploy.** Vercel gives you a URL like `ryan-birthday.vercel.app`. Every later push to `main` redeploys automatically.

### Link previews
The page sets `og:title` and `og:description`, so Slack and chat apps show "Happy Birthday, Ryan!" and "A birthday surprise for Ryan 🎁". For a preview image too, add a 1200×630 `og-image.png` to the repo and add this tag to `index.html`, using the full deployed URL:

```html
<meta property="og:image" content="https://ryan-birthday.vercel.app/og-image.png">
```

Slack caches previews, so do a test paste in a DM to yourself before sharing the link.
