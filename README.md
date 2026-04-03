# Kumar Mrinal — Portfolio

A cinematic 3D scroll-animated portfolio site. Pure HTML/CSS/JS — no build step needed.

## 🚀 Deploy to GitHub Pages (one-time setup)

1. Create a repo named exactly: `mrinal22258.github.io`
2. Upload all files from this folder into the repo root
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your site is live at `https://mrinal22258.github.io`

## 📁 File Structure

```
portfolio/
├── index.html     ← All page content (edit your info here)
├── style.css      ← All styling (edit colours in :root)
├── main.js        ← All animations & interactions
├── photo.jpg      ← Your profile photo 
├── resume.pdf     ← resume PDF 
└── README.md
```

## ✏️ How to Update Content

### Change your info
Open `index.html` and edit the relevant sections:
- **Hero card**: look for `class="hinge-name"`, `class="hinge-tagline"`, `class="hinge-pills"`
- **About**: look for `id="about"`
- **Skills**: look for `id="skills"` — edit `.ticker-inner` spans and `.skill-bar-item` entries
- **Research/Experience**: look for `id="experience"` — edit `.tl-item` blocks
- **Projects**: look for `id="projects"` — edit `.proj-card` blocks
- **Contact**: look for `id="contact"`

### Change colours
Open `style.css` and edit the `:root` block at the top:
```css
:root {
  --accent:  #e85d04;   /* ← main accent colour */
  --accent2: #38b000;
  --accent3: #7b2d8b;
  --bg:      #080808;   /* ← page background */
}
```

### Add your photo
Replace `photo.jpg` with your actual photo file. Keep the name `photo.jpg`,
or update the `src` in `index.html`:
```html
<img src="photo.jpg" alt="Kumar Mrinal" ... />
```

### Update resume
Replace `resume.pdf` with your latest resume. Keep the filename, or update
the link in `index.html`:
```html
<a href="resume.pdf" ...>Resume ↗</a>
```

## ✨ Features
- Scroll-driven cinematic text animations (inspired by the reference 3D portfolio)
- Particle network canvas background
- Hinge-style profile card with 3D mouse-tilt effect
- Custom magnetic cursor
- Infinite skill ticker rows
- Animated skill bars
- Netflix-style project cards
- Counter animation on stats
- Intersection Observer reveals
- Fully responsive (mobile-friendly)
- Zero dependencies — works offline

## 🎨 Design Inspirations
- **Hinge**: profile prompt card, interest pills, connection CTA
- **Netflix**: dark cinematic palette, card hover effects, section reveals
- **Reference 3D Portfolio**: scroll-driven canvas, sticky section overlays
