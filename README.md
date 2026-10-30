# OptiLock CAPTCHA

Pure client-side, zero-dependency, multi-mode & multi-language **Real-World Photo CAPTCHA** library. Works in any web project (HTML, React, Vue, PHP, Python, .NET, etc.) without requiring a Node.js backend.

## ✨ Features

- **5 Verification Modes (`data-type`):**
  - `focus` — **Optical Focus Lock:** Slide the lens ring to bring a blurry, parallax-shifted photo into sharp focus.
  - `horizon` — **Horizon & Angle Lock:** Level a tilted photo to `0°`.
  - `target` — **Contextual Target Tap:** Tap directly on a contextually described object in the photo.
  - `grid` — **3x3 Photo Grid:** Select matching photos from a 3x3 grid.
  - `random` — **Dynamic Random Mode:** Randomly picks one of the 4 modes on every challenge.
- **Multi-Language Support (`data-lang`):** Built-in support for **Turkish (`tr`)**, **English (`en`)**, and **German (`de`)**.
- **Production Ready (`dist/`):** Includes minified `.min.js`, `.min.css`, and `.js.map` source maps.

---

## 📁 Files

```text
├── src/
│   ├── optilock.js          # Unminified source code
│   └── optilock.css         # Unminified stylesheet
└── dist/
    ├── optilock.min.js      # Minified production bundle
    ├── optilock.min.js.map  # Source map for debugging
    └── optilock.min.css     # Minified production stylesheet
```

---

## 🚀 Usage

### 1. Include CSS & JS in your HTML

```html
<link rel="stylesheet" href="dist/optilock.min.css" />
<script src="dist/optilock.min.js"></script>
```

### 2. Configure Your Images & Add the Widget

```html
<form action="/submit" method="POST">
  <!-- Modes: focus | horizon | target | grid | random -->
  <!-- Languages: tr | en | de -->
  <div class="g-recaptcha" data-type="focus" data-lang="tr"></div>

  <button type="submit">Submit</button>
</form>

<script>
  OptiLock.configure({
    scenes: [
      {
        photoUrl: '/images/car.jpg',
        category: 'vehicle',
        title: { tr: 'Otomobil', en: 'Car', de: 'Auto' },
        gridLabel: { tr: 'otomobilleri', en: 'cars', de: 'Autos' },
        hotspot: {
          x: 50,
          y: 60,
          radius: 22,
          prompt: {
            tr: 'Aracın ön kaputuna dokunun',
            en: 'Tap on the front hood',
            de: 'Tippen Sie auf die Motorhaube'
          }
        }
      }
    ]
  });
</script>
```

When verified, the widget automatically populates `<input type="hidden" name="captchaToken" value="ol_...">` inside your form.
