/**
 * OptiLock CAPTCHA v1.0.0
 * Pure Client-Side, Multi-Mode & Multi-Language Real-World Photo CAPTCHA Library
 * Zero Dependencies — Works in any HTML/JS, React, Vue, PHP, Python, .NET or Static Project
 *
 * Modes (data-type): "focus" | "horizon" | "target" | "grid" | "random"
 * Languages (data-lang): "tr" | "en" | "de"
 */
(function (global) {
  'use strict';

  const SUPPORTED_TYPES = ['focus', 'horizon', 'target', 'grid'];
  const SUPPORTED_LANGS = ['tr', 'en', 'de'];

  const I18N = {
    tr: {
      triggerTitle: 'Gerçek Dünya Doğrulaması',
      verifiedTitle: 'Doğrulama Tamamlandı',
      verifiedSub: 'Onaylanan mod:',
      sliderTitle: '◀ Kaydırarak Hizalayın ▶',
      sliderWait: 'Hizalandığında bırakın',
      sliderLocked: 'Kilitlendi! Şimdi bırakın ✓',
      clarity: 'Netlik',
      angle: 'Açı',
      tapHint: 'Doğrudan fotoğraftaki hedefe dokunun',
      gridHint: 'Eşleşen kareleri seçip Doğrula\'ya basın',
      gridEmptyErr: 'Lütfen en az bir fotoğraf seçin.',
      verifyBtn: 'DOĞRULA',
      refreshTitle: 'Yeni Soru Yükle',
      badges: {
        focus: 'OPTİK ODAK KİLİDİ',
        horizon: 'UFUK & AÇI KİLİDİ',
        target: 'BAĞLAMSAL HEDEF NOKTASI',
        grid: '3x3 FOTOĞRAF SEÇİMİ'
      },
      instructions: {
        focus: (t) => (t ? `Merceği kaydırarak "${t}" görüntüsünü tam netleştirin` : 'Merceği kaydırarak görüntüyü tam netleştirin'),
        horizon: (t) => (t ? `Kaydırıcı ile "${t}" görüntüsünü düz konuma (0°) getirin` : 'Kaydırıcı ile görüntüyü düz konuma (0°) getirin'),
        target: (p) => p || 'Görüntüdeki hedef noktaya dokunun',
        grid: (l) => (l ? `${l} içeren tüm kareleri seçin` : 'Eşleşen tüm kareleri seçin')
      },
      errors: {
        noScenes: 'Görsel veri seti (scenes) tanımlanmadı.',
        reloadAlign: 'Hizalama sağlanamadı, yeni görsel yüklendi.',
        stillBlurry: 'Görüntü hâlâ bulanık, tam netleştirin.',
        stillTilted: 'Görüntü hâlâ eğik, tam düz (0°) yapın.',
        botSpeed: 'Şüpheli (bot) hızı algılandı, tekrar deneyin.',
        targetMissedReload: 'Hedef nokta kaçırıldı, yeni görsel yüklendi.',
        targetMissed: 'Tam hedef nesnenin üzerine dokunun.',
        gridMismatchReload: 'Seçimler eşleşmedi, yeni görseller yüklendi.',
        gridMismatch: 'Lütfen eşleşen tüm kareleri seçin.'
      },
      modes: {
        focus: 'Optik odak kilidi ile doğrula',
        horizon: 'Ufuk çizgisi & açı hizalama',
        target: 'Fotoğraftaki hedefe dokunarak doğrula',
        grid: '3x3 gerçek dünya fotoğraf seçimi',
        random: 'Dinamik çoklu doğrulama modu'
      }
    },
    en: {
      triggerTitle: 'Real-World Verification',
      verifiedTitle: 'Verification Complete',
      verifiedSub: 'Approved mode:',
      sliderTitle: '◀ Slide to Align ▶',
      sliderWait: 'Release when aligned',
      sliderLocked: 'Locked! Release now ✓',
      clarity: 'Clarity',
      angle: 'Angle',
      tapHint: 'Tap directly on the target in the photo',
      gridHint: 'Select matching tiles and click Verify',
      gridEmptyErr: 'Please select at least one photo.',
      verifyBtn: 'VERIFY',
      refreshTitle: 'Load New Challenge',
      badges: {
        focus: 'OPTICAL FOCUS LOCK',
        horizon: 'HORIZON & ANGLE LOCK',
        target: 'CONTEXTUAL TARGET TAP',
        grid: '3x3 PHOTO GRID'
      },
      instructions: {
        focus: (t) => (t ? `Slide the lens ring to bring "${t}" into sharp focus` : 'Slide the lens ring to bring the image into sharp focus'),
        horizon: (t) => (t ? `Use the slider to level "${t}" to 0°` : 'Use the slider to level the image to 0°'),
        target: (p) => p || 'Tap directly on the target point',
        grid: (l) => (l ? `Select all tiles containing ${l}` : 'Select all matching tiles')
      },
      errors: {
        noScenes: 'No image scenes configured.',
        reloadAlign: 'Alignment failed, loaded a new image.',
        stillBlurry: 'Image is still blurry, bring it into sharp focus.',
        stillTilted: 'Image is still tilted, align it to 0°.',
        botSpeed: 'Suspicious robotic speed detected, try again.',
        targetMissedReload: 'Target missed, loaded a new image.',
        targetMissed: 'Tap directly on the requested target object.',
        gridMismatchReload: 'Selection did not match, loaded new images.',
        gridMismatch: 'Please select all matching tiles.'
      },
      modes: {
        focus: 'Verify with optical focus lock',
        horizon: 'Horizon line & angle alignment',
        target: 'Tap on the contextual target',
        grid: '3x3 real-world photo selection',
        random: 'Dynamic multi-mode verification'
      }
    },
    de: {
      triggerTitle: 'Echtfoto-Verifizierung',
      verifiedTitle: 'Verifizierung Abgeschlossen',
      verifiedSub: 'Bestätigter Modus:',
      sliderTitle: '◀ Zum Ausrichten ziehen ▶',
      sliderWait: 'Loslassen wenn ausgerichtet',
      sliderLocked: 'Fixiert! Jetzt loslassen ✓',
      clarity: 'Schärfe',
      angle: 'Winkel',
      tapHint: 'Tippen Sie direkt auf das Ziel im Foto',
      gridHint: 'Passende Fotos wählen & Bestätigen',
      gridEmptyErr: 'Bitte mindestens ein Foto auswählen.',
      verifyBtn: 'BESTÄTIGEN',
      refreshTitle: 'Neue Aufgabe laden',
      badges: {
        focus: 'OPTISCHE FOKUS-SPERRE',
        horizon: 'HORIZONT & WINKEL',
        target: 'ZIELPUNKT ANTIPPEN',
        grid: '3x3 FOTO-AUSWAHL'
      },
      instructions: {
        focus: (t) => (t ? `Ziehen Sie den Regler, um „${t}“ scharfzustellen` : 'Ziehen Sie den Regler, um das Bild scharfzustellen'),
        horizon: (t) => (t ? `Richten Sie „${t}“ gerade (0°) aus` : 'Richten Sie das Bild gerade (0°) aus'),
        target: (p) => p || 'Tippen Sie auf den Zielpunkt',
        grid: (l) => (l ? `Wählen Sie alle Kacheln mit ${l} aus` : 'Wählen Sie alle passenden Kacheln aus')
      },
      errors: {
        noScenes: 'Keine Bildszenen konfiguriert.',
        reloadAlign: 'Ausrichtung fehlgeschlagen, neues Bild geladen.',
        stillBlurry: 'Das Bild ist noch unscharf.',
        stillTilted: 'Das Bild ist noch schief (0° erforderlich).',
        botSpeed: 'Unnatürliche Geschwindigkeit erkannt.',
        targetMissedReload: 'Ziel verfehlt, neues Bild geladen.',
        targetMissed: 'Tippen Sie direkt auf das gesuchte Objekt.',
        gridMismatchReload: 'Auswahl falsch, neue Bilder geladen.',
        gridMismatch: 'Bitte wählen Sie alle passenden Kacheln aus.'
      },
      modes: {
        focus: 'Mit optischer Fokus-Sperre prüfen',
        horizon: 'Horizont & Winkel ausrichten',
        target: 'Zielobjekt im Foto antippen',
        grid: '3x3 Echtfoto-Auswahl',
        random: 'Dynamischer Zufallsmodus'
      }
    }
  };

  let globalScenes = [];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function normalizeLang(lang) {
    const l = (lang || 'tr').toLowerCase();
    return SUPPORTED_LANGS.includes(l) ? l : 'tr';
  }

  function resolveText(field, lang) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.tr || field.en || Object.values(field)[0] || '';
  }

  function generateClientToken(mode) {
    const arr = new Uint8Array(16);
    if (global.crypto && global.crypto.getRandomValues) {
      global.crypto.getRandomValues(arr);
    } else {
      for (let i = 0; i < 16; i++) arr[i] = randomInt(0, 255);
    }
    const hex = Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
    const payload = btoa(JSON.stringify({ nonce: hex, iat: Date.now(), mode }));
    return `ol_${payload}`;
  }

  class OptiLock {
    static configure({ scenes = [] } = {}) {
      if (Array.isArray(scenes)) {
        globalScenes = scenes;
      }
    }

    constructor(containerSelector, options = {}) {
      this.container =
        typeof containerSelector === 'string'
          ? document.querySelector(containerSelector)
          : containerSelector;

      if (!this.container) return;

      this.options = {
        type: options.type || this.container.dataset.type || 'focus',
        lang: normalizeLang(options.lang || this.container.dataset.lang || 'tr'),
        inputName: options.inputName || this.container.dataset.inputName || 'captchaToken',
        scenes: Array.isArray(options.scenes) ? options.scenes : null,
        onVerified: options.onVerified || null
      };

      this.state = 'idle';
      this.token = '';
      this.currentChallenge = null;
      this.selectedIndices = new Set();
      this.attempts = 0;

      this.dragStartTime = 0;
      this.moveSamples = 0;

      this.render();
      this.bindEvents();
    }

    t() {
      return I18N[this.options.lang] || I18N.tr;
    }

    getScenesPool() {
      return this.options.scenes && this.options.scenes.length > 0 ? this.options.scenes : globalScenes;
    }

    setConfig({ type, lang, scenes }) {
      if (type) {
        this.options.type = type;
        this.container.dataset.type = type;
      }
      if (lang) {
        this.options.lang = normalizeLang(lang);
        this.container.dataset.lang = this.options.lang;
      }
      if (Array.isArray(scenes)) {
        this.options.scenes = scenes;
      }
      this.reset();
    }

    render() {
      const dict = this.t();
      this.container.innerHTML = `
        <div class="g-recaptcha-root">
          <input type="hidden" name="${this.options.inputName}" class="ol-token-input" value="" />
          <input type="text" class="ol-hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <div class="ol-lens-popover" role="dialog">
            <div class="ol-popover-header">
              <div class="ol-header-info">
                <span class="ol-scene-badge"></span>
                <span class="ol-scene-instruction"></span>
              </div>
              <button type="button" class="ol-refresh-btn" title="${dict.refreshTitle}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              </button>
            </div>

            <div class="ol-viewport">
              <img class="ol-photo-base" src="" alt="" crossorigin="anonymous" />
              <img class="ol-photo-ghost" src="" alt="" crossorigin="anonymous" />

              <div class="ol-reticle-overlay">
                <div class="ol-horizon-guide"></div>
                <div class="ol-focus-ring">
                  <div class="ol-crosshair-dot"></div>
                </div>
              </div>

              <div class="ol-tap-marker"></div>
              <div class="ol-hud-clarity"></div>
            </div>

            <div class="ol-grid-view"></div>

            <div class="ol-slider-section">
              <div class="ol-slider-labels">
                <span class="ol-slider-title">${dict.sliderTitle}</span>
                <span class="ol-status-msg">${dict.sliderWait}</span>
              </div>
              <input type="range" min="0" max="100" step="0.5" value="10" class="ol-range-input" />
            </div>

            <div class="ol-grid-footer">
              <span class="ol-status-msg ol-footer-msg"></span>
              <button type="button" class="ol-verify-btn">${dict.verifyBtn}</button>
            </div>
          </div>

          <div class="ol-trigger-box" role="button" tabindex="0" aria-checked="false">
            <div class="ol-trigger-left">
              <div class="ol-aperture-ring">${this.getApertureSvg()}</div>
              <div class="ol-trigger-text">
                <span class="ol-trigger-title">${dict.triggerTitle}</span>
                <span class="ol-trigger-sub">${dict.modes[this.options.type] || dict.modes.focus}</span>
              </div>
            </div>

            <div class="ol-trigger-brand">
              <span class="ol-brand-badge">OptiLock</span>
              <span class="ol-brand-sub">${this.options.type.toUpperCase()} · ${this.options.lang.toUpperCase()}</span>
            </div>
          </div>
        </div>
      `;

      this.rootEl = this.container.querySelector('.g-recaptcha-root');
      this.tokenInput = this.container.querySelector('.ol-token-input');
      this.hpInput = this.container.querySelector('.ol-hp-field');
      this.triggerBox = this.container.querySelector('.ol-trigger-box');
      this.apertureRing = this.container.querySelector('.ol-aperture-ring');
      this.triggerTitle = this.container.querySelector('.ol-trigger-title');
      this.triggerSub = this.container.querySelector('.ol-trigger-sub');
      this.brandSub = this.container.querySelector('.ol-brand-sub');

      this.popoverEl = this.container.querySelector('.ol-lens-popover');
      this.sceneBadge = this.container.querySelector('.ol-scene-badge');
      this.sceneInstr = this.container.querySelector('.ol-scene-instruction');
      this.refreshBtn = this.container.querySelector('.ol-refresh-btn');

      this.viewportEl = this.container.querySelector('.ol-viewport');
      this.baseImg = this.container.querySelector('.ol-photo-base');
      this.ghostImg = this.container.querySelector('.ol-photo-ghost');
      this.horizonGuide = this.container.querySelector('.ol-horizon-guide');
      this.focusRing = this.container.querySelector('.ol-focus-ring');
      this.tapMarker = this.container.querySelector('.ol-tap-marker');
      this.hudClarity = this.container.querySelector('.ol-hud-clarity');

      this.gridViewEl = this.container.querySelector('.ol-grid-view');
      this.sliderSection = this.container.querySelector('.ol-slider-section');
      this.sliderTitleEl = this.container.querySelector('.ol-slider-title');
      this.rangeInput = this.container.querySelector('.ol-range-input');
      this.statusMsg = this.container.querySelector('.ol-status-msg');
      this.gridFooter = this.container.querySelector('.ol-grid-footer');
      this.footerMsg = this.container.querySelector('.ol-footer-msg');
      this.verifyBtn = this.container.querySelector('.ol-verify-btn');
    }

    getApertureSvg() {
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
          <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
          <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
          <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
        </svg>
      `;
    }

    bindEvents() {
      this.triggerBox.addEventListener('click', () => this.onTriggerClick());
      this.refreshBtn.addEventListener('click', () => this.loadNewChallenge());

      const startDrag = () => {
        this.dragStartTime = Date.now();
        this.moveSamples = 0;
      };
      this.rangeInput.addEventListener('mousedown', startDrag);
      this.rangeInput.addEventListener('touchstart', startDrag, { passive: true });

      this.rangeInput.addEventListener('input', () => {
        this.moveSamples += 1;
        this.applyVisualEffect(parseFloat(this.rangeInput.value));
      });

      this.rangeInput.addEventListener('change', () => {
        this.verifySlider();
      });

      this.viewportEl.addEventListener('click', (e) => {
        if (!this.currentChallenge || this.currentChallenge.type !== 'target') return;
        const rect = this.viewportEl.getBoundingClientRect();
        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;

        this.tapMarker.style.left = `${xPct}%`;
        this.tapMarker.style.top = `${yPct}%`;
        this.tapMarker.classList.add('ol-active');

        this.verifyTarget(xPct, yPct);
      });

      this.verifyBtn.addEventListener('click', () => {
        this.verifyGrid();
      });

      document.addEventListener('mousedown', (e) => {
        if (this.state === 'challenge' && !this.rootEl.contains(e.target)) {
          this.popoverEl.classList.remove('ol-open');
        }
      });
    }

    onTriggerClick() {
      if (this.state === 'verified' || this.hpInput.value) return;

      if (this.state === 'challenge') {
        this.popoverEl.classList.toggle('ol-open');
        return;
      }

      this.state = 'challenge';
      this.loadNewChallenge();
      this.popoverEl.classList.add('ol-open');
    }

    buildChallenge() {
      const dict = this.t();
      const lang = this.options.lang;
      const pool = this.getScenesPool();

      if (!pool || pool.length === 0) {
        throw new Error(dict.errors.noScenes);
      }

      let type = (this.options.type || 'focus').toLowerCase();
      if (type === 'random' || !SUPPORTED_TYPES.includes(type)) {
        type = randomChoice(SUPPORTED_TYPES);
      }

      if (type === 'focus' || type === 'horizon') {
        const scene = randomChoice(pool);
        const targetVal = randomInt(22, 82);
        const titleText = resolveText(scene.title, lang);

        return {
          type,
          badge: dict.badges[type],
          instruction: dict.instructions[type](titleText),
          photoUrl: scene.photoUrl || scene.url,
          targetVal,
          initialSlider: targetVal > 50 ? randomInt(6, 16) : randomInt(84, 94)
        };
      }

      if (type === 'target') {
        const targetPool = pool.filter((s) => s.hotspot);
        const scene = randomChoice(targetPool.length > 0 ? targetPool : pool);
        const hotspot = scene.hotspot || { x: 50, y: 50, radius: 24 };
        const promptText = resolveText(hotspot.prompt || scene.prompt, lang);

        return {
          type: 'target',
          badge: dict.badges.target,
          instruction: dict.instructions.target(promptText),
          photoUrl: scene.photoUrl || scene.url,
          hotspot
        };
      }

      // GRID (3x3)
      const categories = [...new Set(pool.map((s) => s.category).filter(Boolean))];
      const targetCat = categories.length > 0 ? randomChoice(categories) : null;
      const matchingPool = targetCat ? pool.filter((s) => s.category === targetCat) : pool;
      const distractorPool = targetCat ? pool.filter((s) => s.category !== targetCat) : pool;

      const items = [];
      for (let i = 0; i < Math.min(3, matchingPool.length); i++) {
        items.push({ scene: matchingPool[i % matchingPool.length], isTarget: true });
      }
      while (items.length < 9) {
        const dScene = randomChoice(distractorPool.length > 0 ? distractorPool : pool);
        items.push({ scene: dScene, isTarget: distractorPool.length === 0 });
      }

      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      const correctIndices = [];
      const tiles = items.map((item, idx) => {
        if (item.isTarget) correctIndices.push(idx);
        return { index: idx, photoUrl: item.scene.photoUrl || item.scene.url };
      });

      const labelText = resolveText(matchingPool[0]?.gridLabel || matchingPool[0]?.title || targetCat, lang);

      return {
        type: 'grid',
        badge: dict.badges.grid,
        instruction: dict.instructions.grid(labelText),
        tiles,
        correctIndices
      };
    }

    loadNewChallenge() {
      const dict = this.t();
      try {
        const ch = this.buildChallenge();
        this.currentChallenge = ch;
        this.attempts = 0;
        this.selectedIndices.clear();
        this.tapMarker.classList.remove('ol-active');

        this.sceneBadge.textContent = ch.badge;
        this.sceneInstr.textContent = ch.instruction;
        this.sliderTitleEl.textContent = dict.sliderTitle;
        this.verifyBtn.textContent = dict.verifyBtn;

        this.viewportEl.style.display = ch.type === 'grid' ? 'none' : 'block';
        this.viewportEl.classList.toggle('ol-clickable', ch.type === 'target');
        this.gridViewEl.classList.toggle('ol-active', ch.type === 'grid');
        this.sliderSection.style.display = ch.type === 'focus' || ch.type === 'horizon' ? 'block' : 'none';
        this.gridFooter.classList.toggle('ol-active', ch.type === 'grid' || ch.type === 'target');
        this.verifyBtn.style.display = ch.type === 'grid' ? 'inline-block' : 'none';

        if (ch.type === 'focus' || ch.type === 'horizon') {
          this.baseImg.src = ch.photoUrl;
          this.ghostImg.src = ch.photoUrl;
          this.horizonGuide.classList.toggle('ol-visible', ch.type === 'horizon');
          this.focusRing.style.display = 'flex';
          this.hudClarity.style.display = 'block';
          this.rangeInput.value = ch.initialSlider;
          this.applyVisualEffect(ch.initialSlider);
        } else if (ch.type === 'target') {
          this.baseImg.src = ch.photoUrl;
          this.baseImg.style.filter = 'none';
          this.baseImg.style.transform = 'none';
          this.ghostImg.style.opacity = '0';
          this.horizonGuide.classList.remove('ol-visible');
          this.focusRing.style.display = 'none';
          this.hudClarity.style.display = 'none';
          this.footerMsg.textContent = dict.tapHint;
          this.footerMsg.style.color = '#38bdf8';
        } else if (ch.type === 'grid') {
          this.gridViewEl.innerHTML = '';
          this.footerMsg.textContent = dict.gridHint;
          this.footerMsg.style.color = '#94a3b8';

          ch.tiles.forEach((tile) => {
            const div = document.createElement('div');
            div.className = 'ol-grid-tile';
            div.innerHTML = `
              <img src="${tile.photoUrl}" alt="" crossorigin="anonymous" />
              <div class="ol-grid-check">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            `;
            div.addEventListener('click', () => {
              const idx = Number(tile.index);
              if (this.selectedIndices.has(idx)) {
                this.selectedIndices.delete(idx);
                div.classList.remove('ol-selected');
              } else {
                this.selectedIndices.add(idx);
                div.classList.add('ol-selected');
              }
            });
            this.gridViewEl.appendChild(div);
          });
        }
      } catch (err) {
        this.sceneBadge.textContent = 'OPTILOCK';
        this.sceneInstr.textContent = err.message;
      }
    }

    applyVisualEffect(sliderVal) {
      if (!this.currentChallenge) return;
      const dict = this.t();
      const type = this.currentChallenge.type;
      const delta = sliderVal - this.currentChallenge.targetVal;
      const absDelta = Math.abs(delta);

      if (type === 'focus') {
        const blurPx = Math.min(14, absDelta / 4.2).toFixed(2);
        const shiftX = (delta * 0.65).toFixed(1);
        const shiftY = (delta * -0.25).toFixed(1);
        const ghostOp = Math.min(0.65, absDelta / 45).toFixed(2);
        const scale = (1.06 + absDelta * 0.0012).toFixed(3);

        this.baseImg.style.filter = `blur(${blurPx}px)`;
        this.baseImg.style.transform = `scale(${scale})`;
        this.ghostImg.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(${scale})`;
        this.ghostImg.style.opacity = ghostOp;

        const clarityPct = Math.max(0, Math.min(100, Math.round(100 - absDelta * 1.6)));
        this.hudClarity.textContent = `${dict.clarity}: %${clarityPct}`;
      } else if (type === 'horizon') {
        const angleDeg = (delta * 0.65).toFixed(1);
        this.baseImg.style.filter = 'none';
        this.baseImg.style.transform = `rotate(${angleDeg}deg) scale(1.26)`;
        this.ghostImg.style.opacity = '0';
        this.hudClarity.textContent = `${dict.angle}: ${angleDeg}°`;
      }

      if (absDelta <= 4.5) {
        this.focusRing.classList.add('ol-in-focus');
        this.hudClarity.style.color = '#4ade80';
        this.statusMsg.textContent = dict.sliderLocked;
        this.statusMsg.style.color = '#4ade80';
      } else {
        this.focusRing.classList.remove('ol-in-focus');
        this.hudClarity.style.color = '#f8fafc';
        this.statusMsg.textContent = dict.sliderWait;
        this.statusMsg.style.color = '#fbbf24';
      }
    }

    verifySlider() {
      const dict = this.t();
      const ch = this.currentChallenge;
      this.attempts += 1;

      const val = parseFloat(this.rangeInput.value);
      const diff = Math.abs(val - ch.targetVal);
      const dragDurationMs = Math.max(1, Date.now() - this.dragStartTime);

      if (diff > 5.0) {
        this.shakePopover();
        if (this.attempts >= 3) {
          this.statusMsg.textContent = dict.errors.reloadAlign;
          this.statusMsg.style.color = '#f87171';
          setTimeout(() => this.loadNewChallenge(), 450);
          return;
        }
        this.statusMsg.textContent = ch.type === 'focus' ? dict.errors.stillBlurry : dict.errors.stillTilted;
        this.statusMsg.style.color = '#f87171';
        return;
      }

      if (dragDurationMs < 110 || this.moveSamples < 3) {
        this.shakePopover();
        this.statusMsg.textContent = dict.errors.botSpeed;
        this.statusMsg.style.color = '#f87171';
        setTimeout(() => this.loadNewChallenge(), 450);
        return;
      }

      this.popoverEl.classList.remove('ol-open');
      this.markVerified(generateClientToken(ch.type), ch.type);
    }

    verifyTarget(xPct, yPct) {
      const dict = this.t();
      const ch = this.currentChallenge;
      this.attempts += 1;

      const radius = Number(ch.hotspot.radius) || 24;
      const dist = Math.hypot(xPct - ch.hotspot.x, yPct - ch.hotspot.y);

      if (dist <= radius) {
        this.popoverEl.classList.remove('ol-open');
        this.markVerified(generateClientToken('target'), 'target');
        return;
      }

      this.shakePopover();
      if (this.attempts >= 2) {
        this.footerMsg.textContent = dict.errors.targetMissedReload;
        this.footerMsg.style.color = '#f87171';
        setTimeout(() => this.loadNewChallenge(), 450);
        return;
      }
      this.footerMsg.textContent = dict.errors.targetMissed;
      this.footerMsg.style.color = '#f87171';
    }

    verifyGrid() {
      const dict = this.t();
      const ch = this.currentChallenge;

      if (this.selectedIndices.size === 0) {
        this.footerMsg.textContent = dict.gridEmptyErr;
        this.footerMsg.style.color = '#f87171';
        this.shakePopover();
        return;
      }

      this.attempts += 1;
      const selected = Array.from(this.selectedIndices).sort((a, b) => a - b);
      const expected = [...ch.correctIndices].sort((a, b) => a - b);

      const isMatch = selected.length === expected.length && selected.every((v, i) => v === expected[i]);

      if (isMatch) {
        this.popoverEl.classList.remove('ol-open');
        this.markVerified(generateClientToken('grid'), 'grid');
        return;
      }

      this.shakePopover();
      if (this.attempts >= 2) {
        this.footerMsg.textContent = dict.errors.gridMismatchReload;
        this.footerMsg.style.color = '#f87171';
        setTimeout(() => this.loadNewChallenge(), 450);
        return;
      }
      this.footerMsg.textContent = dict.errors.gridMismatch;
      this.footerMsg.style.color = '#f87171';
    }

    markVerified(token, mode) {
      const dict = this.t();
      this.state = 'verified';
      this.token = token;
      this.tokenInput.value = token;

      this.triggerBox.classList.add('ol-verified');
      this.triggerBox.setAttribute('aria-checked', 'true');
      this.apertureRing.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      this.triggerTitle.textContent = dict.verifiedTitle;
      this.triggerSub.textContent = `${dict.verifiedSub} ${mode.toUpperCase()}`;

      if (typeof this.options.onVerified === 'function') {
        this.options.onVerified(token);
      }
    }

    shakePopover() {
      this.popoverEl.classList.remove('ol-shake');
      void this.popoverEl.offsetWidth;
      this.popoverEl.classList.add('ol-shake');
    }

    reset() {
      const dict = this.t();
      this.state = 'idle';
      this.token = '';
      this.tokenInput.value = '';
      this.popoverEl.classList.remove('ol-open');
      this.triggerBox.classList.remove('ol-verified');
      this.triggerBox.setAttribute('aria-checked', 'false');
      this.apertureRing.innerHTML = this.getApertureSvg();
      this.triggerTitle.textContent = dict.triggerTitle;
      this.triggerSub.textContent = dict.modes[this.options.type] || dict.modes.focus;
      this.brandSub.textContent = `${this.options.type.toUpperCase()} · ${this.options.lang.toUpperCase()}`;
      this.refreshBtn.title = dict.refreshTitle;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.g-recaptcha').forEach((el) => {
      if (!el._optilockInstance) {
        el._optilockInstance = new OptiLock(el);
      }
    });
  });

  global.OptiLock = OptiLock;
  global.CustomReCaptcha = OptiLock;
})(typeof window !== 'undefined' ? window : this);

