/* ============================================================
   SENTIRE ATELIER STUDIO — LUXURY ENGINE & WIZARD JS
   ============================================================ */
(() => {
  'use strict';

  /* ── FRAGRANCES DATABASE ───────────────────────────────── */
  const FRAGRANCES = [
    {
      id: 'white-oud',
      name: 'White Oud',
      price: 8999,
      image: 'assets/white-oud.png',
      notes: 'White Oud • Jasmine • Soft Musk'
    },
    {
      id: 'purple-oud',
      name: 'Purple Oud',
      price: 8999,
      image: 'assets/purple-oud-arrival.png',
      notes: 'Smoky Oud • Amethyst Rose'
    },
    {
      id: 'rich',
      name: 'RICH',
      price: 8499,
      image: 'assets/rich.png',
      notes: 'Golden Amber • Silk • Spice'
    },
    {
      id: 'calantha',
      name: 'Calantha',
      price: 7999,
      image: 'assets/calantha.png',
      notes: 'White Floral • Dewy Jasmine'
    },
    {
      id: 'herrlich',
      name: 'Herrlich',
      price: 8499,
      image: 'assets/herrlich.png',
      notes: 'Majestic Amber • Velvet Musk'
    },
    {
      id: 'deep-crush',
      name: 'Deep Crush',
      price: 8999,
      image: 'assets/deep-crush.png',
      notes: 'Dark Saffron • Rich Oud'
    }
  ];

  /* ── STUDIO STATE ─────────────────────────────────────── */
  const state = {
    currentStep: 1,
    selectedFragrance: FRAGRANCES[0],
    engravingFee: 999,
    photoImage: null,
    photoName: '',
    photoX: 0,
    photoY: 0,
    photoScale: 1.0,
    photoContrast: 1.4,
    finishSheen: 'silver',
    textLine1: 'PRIYA & ROHAN',
    textLine2: '11.08.2026 • ETERNAL',
    fontChoice: 'Cormorant Garamond',
    metalFinish: 'gold',
    metalName: '24K Polished Gold',
    boxSleeveText: 'FOR MY ETERNAL LOVE',
    giftCardNote: 'To the one who illuminates every room. Happy Anniversary, my love.',
    viewMode: 'bottle',
    isDraggingPhoto: false,
    dragStartX: 0,
    dragStartY: 0
  };

  /* ── DOM ELEMENTS ──────────────────────────────────────── */
  const canvas = document.getElementById('bottleCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const fragranceGrid = document.getElementById('fragranceGrid');
  
  /* Upload Elements */
  const photoInput = document.getElementById('photoInput');
  const uploadDropzone = document.getElementById('uploadDropzone');
  const dropzoneContent = document.getElementById('dropzoneContent');
  const uploadSuccess = document.getElementById('uploadSuccess');
  const uploadedThumb = document.getElementById('uploadedThumb');
  const uploadFilename = document.getElementById('uploadFilename');
  const btnChangePhoto = document.getElementById('btnChangePhoto');
  const btnRemovePhoto = document.getElementById('btnRemovePhoto');
  
  /* Sliders & Inputs */
  const sliderScale = document.getElementById('sliderScale');
  const sliderContrast = document.getElementById('sliderContrast');
  const valScale = document.getElementById('valScale');
  const valContrast = document.getElementById('valContrast');
  const engraveTextInput = document.getElementById('engraveTextInput');
  const engraveDateInput = document.getElementById('engraveDateInput');
  const boxSleeveInput = document.getElementById('boxSleeveInput');
  const giftNoteInput = document.getElementById('giftNoteInput');
  const boxEmbossPreview = document.getElementById('boxEmbossPreview');
  const cardNotePreview = document.getElementById('cardNotePreview');
  const boxViewOverlay = document.getElementById('boxViewOverlay');
  
  /* Bottom Bar Displays */
  const barFragranceTitle = document.getElementById('barFragranceTitle');
  const barDetailsSub = document.getElementById('barDetailsSub');
  const totalPriceDisplays = document.querySelectorAll('#totalPriceDisplay');

  /* Buttons */
  const btnAddToCart = document.getElementById('btnAddToCart');
  const btnBuyNowCheckout = document.getElementById('btnBuyNowCheckout');
  const btnPrevStep = document.getElementById('btnPrevStep');
  const btnNextStep = document.getElementById('btnNextStep');
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnResetPhoto = document.getElementById('btnResetPhoto');

  /* Image cache */
  const loadedBottleImg = new Image();

  /* ── INIT STUDIO ──────────────────────────────────────── */
  function initStudio() {
    renderFragranceGrid();
    bindEvents();
    loadSamplePhoto('assets/story-1.webp', 'Couple Portrait');
    loadBottleImage(state.selectedFragrance.image);
    updatePriceAndBar();
  }

  /* ── RENDER FRAGRANCE GRID ───────────────────────────── */
  function renderFragranceGrid() {
    if (!fragranceGrid) return;
    fragranceGrid.innerHTML = FRAGRANCES.map(f => `
      <div class="frag-card ${f.id === state.selectedFragrance.id ? 'is-selected' : ''}" data-frag-id="${f.id}">
        <img src="${f.image}" alt="${f.name}" class="frag-thumb" />
        <div class="frag-card-info">
          <span class="frag-name">${f.name}</span>
          <span class="frag-notes">${f.notes}</span>
          <span class="frag-price">₹${f.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    `).join('');
  }

  /* ── STEP WIZARD NAVIGATION ──────────────────────────── */
  function goToStep(step) {
    state.currentStep = Math.max(1, Math.min(4, step));

    // Update Step Nav Buttons
    document.querySelectorAll('.step-nav-btn').forEach((btn, i) => {
      btn.classList.toggle('is-active', (i + 1) === state.currentStep);
    });

    // Update Panels
    document.querySelectorAll('.wizard-panel').forEach((panel, i) => {
      panel.classList.toggle('is-active', (i + 1) === state.currentStep);
    });

    // Prev / Next button state
    if (btnPrevStep) btnPrevStep.disabled = state.currentStep === 1;
    if (btnNextStep) {
      btnNextStep.textContent = state.currentStep === 4 ? 'Review & Add to Bag →' : 'Next Step →';
    }
  }

  /* ── LOAD BOTTLE BASE IMAGE ──────────────────────────── */
  function loadBottleImage(src) {
    loadedBottleImg.crossOrigin = 'anonymous';
    loadedBottleImg.src = src;
    loadedBottleImg.onload = () => renderCanvas();
  }

  /* ── CANVAS RENDER ENGINE ────────────────────────────── */
  function renderCanvas() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Radial lighting
    const bgGlow = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, w/2);
    bgGlow.addColorStop(0, 'rgba(200, 155, 90, 0.1)');
    bgGlow.addColorStop(1, 'rgba(8, 8, 8, 0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, w, h);

    // Draw Bottle Base
    if (loadedBottleImg.complete && loadedBottleImg.naturalWidth !== 0) {
      const bW = w * 0.72;
      const bH = h * 0.82;
      const bX = (w - bW) / 2;
      const bY = (h - bH) / 2;
      ctx.drawImage(loadedBottleImg, bX, bY, bW, bH);
    }

    const engraveCenterX = w * 0.5;
    const engraveCenterY = h * 0.54;
    const engraveWidth = 240;
    const engraveHeight = 260;

    // Draw Laser Photo Engraving
    if (state.photoImage && state.photoImage.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(engraveCenterX - engraveWidth/2, engraveCenterY - engraveHeight/2, engraveWidth, engraveHeight);
      ctx.clip();

      const pW = 200 * state.photoScale;
      const pH = (state.photoImage.height / state.photoImage.width) * pW;
      const pX = engraveCenterX - pW/2 + state.photoX;
      const pY = engraveCenterY - pH/2 - 20 + state.photoY;

      ctx.globalAlpha = 0.85;
      if (state.finishSheen === 'gold') {
        ctx.filter = `grayscale(100%) contrast(${state.photoContrast * 1.3}) sepia(100%) hue-rotate(5deg) saturate(300%) brightness(1.1)`;
      } else if (state.finishSheen === 'frosted') {
        ctx.filter = `grayscale(100%) contrast(${state.photoContrast}) opacity(0.7)`;
      } else {
        ctx.filter = `grayscale(100%) contrast(${state.photoContrast}) brightness(1.25)`;
      }

      ctx.drawImage(state.photoImage, pX, pY, pW, pH);

      // Glass Etch Texture Lines
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let y = engraveCenterY - engraveHeight/2; y < engraveCenterY + engraveHeight/2; y += 4) {
        ctx.fillRect(engraveCenterX - engraveWidth/2, y, engraveWidth, 1);
      }
      ctx.restore();
    }

    // Draw Engraved Text
    ctx.save();
    ctx.textAlign = 'center';
    let fontStr = `${state.fontChoice}, serif`;
    if (state.fontChoice === 'Great Vibes') fontStr = `'Great Vibes', cursive`;

    if (state.textLine1) {
      ctx.font = `600 ${state.fontChoice === 'Great Vibes' ? '36px' : '20px'} ${fontStr}`;
      ctx.fillStyle = state.finishSheen === 'gold' ? '#d4af37' : '#e5e4e2';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      const line1Y = engraveCenterY + (state.photoImage ? 110 : 20);
      ctx.fillText(state.textLine1.toUpperCase(), engraveCenterX, line1Y);
    }

    if (state.textLine2) {
      ctx.font = `400 13px 'Inter', sans-serif`;
      ctx.fillStyle = 'rgba(240, 240, 240, 0.75)';
      const line2Y = engraveCenterY + (state.photoImage ? 135 : 45);
      ctx.fillText(state.textLine2, engraveCenterX, line2Y);
    }
    ctx.restore();

    // Metal Collar Overlay
    ctx.save();
    let collarColor = 'rgba(212, 175, 55, 0.4)';
    if (state.metalFinish === 'rosegold') collarColor = 'rgba(224, 169, 109, 0.4)';
    if (state.metalFinish === 'obsidian') collarColor = 'rgba(30, 30, 30, 0.6)';
    if (state.metalFinish === 'platinum') collarColor = 'rgba(229, 228, 226, 0.4)';

    ctx.fillStyle = collarColor;
    ctx.beginPath();
    ctx.ellipse(w*0.5, h*0.25, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ── PHOTO FILE HANDLING ──────────────────────────────── */
  function handlePhotoFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    state.photoName = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        state.photoImage = img;
        state.photoX = 0; state.photoY = 0; state.photoScale = 1.0;
        if (uploadedThumb) uploadedThumb.src = e.target.result;
        if (uploadFilename) uploadFilename.textContent = file.name;
        if (dropzoneContent) dropzoneContent.hidden = true;
        if (uploadSuccess) uploadSuccess.hidden = false;
        renderCanvas();
      };
    };
    reader.readAsDataURL(file);
  }

  function loadSamplePhoto(src, name) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      state.photoImage = img;
      state.photoName = name;
      state.photoX = 0; state.photoY = 0; state.photoScale = 1.0;
      if (uploadedThumb) uploadedThumb.src = src;
      if (uploadFilename) uploadFilename.textContent = name;
      if (dropzoneContent) dropzoneContent.hidden = true;
      if (uploadSuccess) uploadSuccess.hidden = false;
      renderCanvas();
    };
  }

  /* ── EVENT BINDINGS ────────────────────────────────────── */
  function bindEvents() {
    /* Fragrance card click */
    fragranceGrid?.addEventListener('click', e => {
      const card = e.target.closest('[data-frag-id]');
      if (!card) return;
      const frag = FRAGRANCES.find(f => f.id === card.dataset.fragId);
      if (!frag) return;

      state.selectedFragrance = frag;
      document.querySelectorAll('.frag-card').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      document.getElementById('specFragranceName').textContent = frag.name;
      loadBottleImage(frag.image);
      updatePriceAndBar();
    });

    /* Step wizard nav */
    document.querySelectorAll('.step-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        goToStep(parseInt(btn.dataset.stepTarget, 10));
      });
    });

    btnPrevStep?.addEventListener('click', () => goToStep(state.currentStep - 1));
    btnNextStep?.addEventListener('click', () => {
      if (state.currentStep < 4) goToStep(state.currentStep + 1);
      else saveCustomProductToCart();
    });

    /* Stage view tabs */
    document.querySelectorAll('[data-stage-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-stage-view]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.viewMode = btn.dataset.stageView;

        if (state.viewMode === 'box') {
          if (boxViewOverlay) boxViewOverlay.hidden = false;
          if (canvas) canvas.hidden = true;
        } else {
          if (boxViewOverlay) boxViewOverlay.hidden = true;
          if (canvas) canvas.hidden = false;
        }
      });
    });

    /* Upload dropzone */
    uploadDropzone?.addEventListener('click', e => {
      if (e.target.closest('#btnChangePhoto') || e.target.closest('#btnRemovePhoto')) return;
      photoInput?.click();
    });

    photoInput?.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) handlePhotoFile(e.target.files[0]);
    });

    btnRemovePhoto?.addEventListener('click', e => {
      e.stopPropagation();
      state.photoImage = null; state.photoName = '';
      if (dropzoneContent) dropzoneContent.hidden = false;
      if (uploadSuccess) uploadSuccess.hidden = true;
      renderCanvas();
    });

    /* Presets */
    document.querySelectorAll('[data-sample-img]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        loadSamplePhoto(btn.dataset.sampleImg, btn.textContent);
      });
    });

    /* Sliders */
    sliderScale?.addEventListener('input', e => {
      state.photoScale = parseFloat(e.target.value);
      if (valScale) valScale.textContent = `${Math.round(state.photoScale * 100)}%`;
      renderCanvas();
    });

    sliderContrast?.addEventListener('input', e => {
      state.photoContrast = parseFloat(e.target.value);
      if (valContrast) valContrast.textContent = state.photoContrast > 1.8 ? 'High' : 'Normal';
      renderCanvas();
    });

    /* Finish sheen chips */
    document.querySelectorAll('[data-finish]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-finish]').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        state.finishSheen = chip.dataset.finish;
        renderCanvas();
      });
    });

    /* Canvas dragging */
    canvas?.addEventListener('mousedown', e => {
      if (!state.photoImage) return;
      state.isDraggingPhoto = true;
      state.dragStartX = e.clientX - state.photoX;
      state.dragStartY = e.clientY - state.photoY;
    });

    window.addEventListener('mousemove', e => {
      if (!state.isDraggingPhoto) return;
      state.photoX = e.clientX - state.dragStartX;
      state.photoY = e.clientY - state.dragStartY;
      renderCanvas();
    });

    window.addEventListener('mouseup', () => { state.isDraggingPhoto = false; });

    btnZoomIn?.addEventListener('click', () => {
      state.photoScale = Math.min(2.0, state.photoScale + 0.1);
      if (sliderScale) sliderScale.value = state.photoScale;
      if (valScale) valScale.textContent = `${Math.round(state.photoScale * 100)}%`;
      renderCanvas();
    });

    btnZoomOut?.addEventListener('click', () => {
      state.photoScale = Math.max(0.4, state.photoScale - 0.1);
      if (sliderScale) sliderScale.value = state.photoScale;
      if (valScale) valScale.textContent = `${Math.round(state.photoScale * 100)}%`;
      renderCanvas();
    });

    btnResetPhoto?.addEventListener('click', () => {
      state.photoX = 0; state.photoY = 0; state.photoScale = 1.0;
      if (sliderScale) sliderScale.value = 1.0;
      if (valScale) valScale.textContent = '100%';
      renderCanvas();
    });

    /* Text & Font inputs */
    engraveTextInput?.addEventListener('input', e => {
      state.textLine1 = e.target.value; renderCanvas();
    });
    engraveDateInput?.addEventListener('input', e => {
      state.textLine2 = e.target.value; renderCanvas();
    });

    document.querySelectorAll('input[name="fontChoice"]').forEach(radio => {
      radio.addEventListener('change', e => {
        document.querySelectorAll('.font-chip').forEach(r => r.classList.remove('is-active'));
        e.target.closest('.font-chip')?.classList.add('is-active');
        state.fontChoice = e.target.value;
        renderCanvas();
      });
    });

    /* Swatches */
    document.querySelectorAll('[data-metal]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('[data-metal]').forEach(s => s.classList.remove('is-active'));
        swatch.classList.add('is-active');
        state.metalFinish = swatch.dataset.metal;
        state.metalName = swatch.dataset.name;
        document.getElementById('specHardware').textContent = state.metalName;
        renderCanvas();
      });
    });

    boxSleeveInput?.addEventListener('input', e => {
      state.boxSleeveText = e.target.value;
      if (boxEmbossPreview) boxEmbossPreview.textContent = e.target.value || 'FOR MY ETERNAL LOVE';
    });

    giftNoteInput?.addEventListener('input', e => {
      state.giftCardNote = e.target.value;
      if (cardNotePreview) cardNotePreview.textContent = `"${e.target.value}"`;
    });

    /* CTA Buttons */
    btnAddToCart?.addEventListener('click', () => saveCustomProductToCart());
    btnBuyNowCheckout?.addEventListener('click', () => {
      saveCustomProductToCart();
      window.location.href = 'checkout.html';
    });
  }

  /* ── UPDATE PRICES & BOTTOM BAR ───────────────────────── */
  function updatePriceAndBar() {
    const total = state.selectedFragrance.price + state.engravingFee;
    totalPriceDisplays.forEach(el => el.textContent = `₹${total.toLocaleString('en-IN')}`);
    
    if (barFragranceTitle) barFragranceTitle.textContent = `${state.selectedFragrance.name} (Custom Couture)`;
    if (barDetailsSub) barDetailsSub.textContent = `100 ML Extrait de Parfum • Photo & Inscription Etched`;
  }

  /* ── SAVE TO CART ─────────────────────────────────────── */
  function saveCustomProductToCart() {
    renderCanvas();
    const customCanvasImage = canvas ? canvas.toDataURL('image/png') : state.selectedFragrance.image;
    const totalPrice = state.selectedFragrance.price + state.engravingFee;

    const customItem = {
      id: `custom-${state.selectedFragrance.id}-${Date.now()}`,
      baseId: state.selectedFragrance.id,
      name: `${state.selectedFragrance.name} (Custom Couture)`,
      price: totalPrice,
      image: customCanvasImage,
      isCustom: true,
      qty: 1,
      details: {
        fragranceName: state.selectedFragrance.name,
        photoEngravingAttached: state.photoName || 'Laser Photo Engraved',
        engravedText: `${state.textLine1} / ${state.textLine2}`,
        fontChoice: state.fontChoice,
        metalFinish: state.metalName,
        boxSleeveText: state.boxSleeveText,
        giftCardNote: state.giftCardNote
      }
    };

    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('sentire_cart') || '[]'); } catch { cart = []; }
    cart.push(customItem);
    localStorage.setItem('sentire_cart', JSON.stringify(cart));

    if (window.SentireCart && window.SentireCart.update) window.SentireCart.update();
    
    alert(`✨ Added Custom ${state.selectedFragrance.name} to your Shopping Bag!`);
  }

  document.addEventListener('DOMContentLoaded', initStudio);
})();
