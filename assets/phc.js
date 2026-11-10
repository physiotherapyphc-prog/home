/* ===== PHC shared script: language switcher, header/footer, navigation, reveal animations ===== */
(function () {
  var COMMON = {
    "en": {
      "nav.label": "Navigate between sections",
      "logo.alt": "Primary Healthcare Centres logo",
      "hero.sub": "Physiotherapy Services",
      "lbl.cover": "Cover",
      "lbl.end": "Closing",
      "ft.contact": "Physiotherapy Services | Publications Team",
      "video.fallback": "Your browser does not support video playback.",
      "chip.rep3": "Repetitions: 3 times",
      "chip.hold30": "Hold: 30 seconds",
      "chip.time30": "Time: 30 seconds",
      "ft.msg": "Dear patient, if you do not feel any improvement in your condition, please visit your doctor.",
      "ft.msg2": "We wish you a speedy recovery."
    },
    "hi": {
      "nav.label": "अनुभागों के बीच नेविगेट करें",
      "logo.alt": "प्राथमिक स्वास्थ्य देखभाल केंद्र का लोगो",
      "hero.sub": "फिजियोथेरेपी सेवाएँ",
      "lbl.cover": "मुखपृष्ठ",
      "lbl.end": "समापन",
      "ft.contact": "फिजियोथेरेपी सेवाएँ | प्रकाशन टीम",
      "video.fallback": "आपका ब्राउज़र वीडियो चलाने का समर्थन नहीं करता।",
      "chip.rep3": "दोहराव: 3 बार",
      "chip.hold30": "रुकना: 30 सेकंड",
      "chip.time30": "समय: 30 सेकंड",
      "ft.msg": "प्रिय मरीज़, यदि आपको अपनी स्थिति में कोई सुधार महसूस नहीं होता है, तो कृपया डॉक्टर से मिलें।",
      "ft.msg2": "हम आपके शीघ्र स्वस्थ होने की कामना करते हैं।"
    },
    "ur": {
      "nav.label": "حصوں کے درمیان نیویگیٹ کریں",
      "logo.alt": "بنیادی صحت کی دیکھ بھال کے مراکز کا لوگو",
      "hero.sub": "فزیوتھراپی خدمات",
      "lbl.cover": "سرورق",
      "lbl.end": "اختتام",
      "ft.msg": "محترم مریض، اگر آپ اپنی حالت میں کوئی بہتری محسوس نہ کریں تو براہِ کرم ڈاکٹر سے رجوع کریں۔",
      "ft.msg2": "ہماری دعا ہے کہ آپ جلد صحت یاب ہوں۔",
      "ft.contact": "فزیوتھراپی خدمات | اشاعتی ٹیم",
      "video.fallback": "آپ کا براؤزر ویڈیو چلانے کی سہولت فراہم نہیں کرتا۔",
      "chip.rep3": "تکرار: 3 مرتبہ",
      "chip.hold30": "رکنا: 30 سیکنڈ",
      "chip.time30": "وقت: 30 سیکنڈ"
    }
  };
  var P = window.PAGE_T || {}, T = {};
  ['en', 'hi', 'ur'].forEach(function (l) { T[l] = Object.assign({}, COMMON[l], P[l] || {}) });
  var DIR = { ar: 'rtl', en: 'ltr', hi: 'ltr', ur: 'rtl' };
  var LOGO = '/assets/primary-logo-white.png';

  /* ---------- global variables ---------- */
  var chrome =
    '<div class="bar" aria-hidden="true"><i id="progress"></i></div>' +
    '<div class="lang" role="group" aria-label="اللغة / Language">' +
    '<button type="button" data-lang="ar" lang="ar">العربية</button>' +
    '<button type="button" data-lang="en" lang="en">English</button>' +
    '<button type="button" data-lang="hi" lang="hi">हिन्दी</button>' +
    '<button type="button" data-lang="ur" lang="ur">اردو</button></div>' +
    '<nav class="dots" id="dots" aria-label="التنقل بين الأقسام"></nav>';
  document.body.insertAdjacentHTML('afterbegin', chrome);

  function heroHTML(title, key) {
    return '<section class="slide hero" data-label="الغلاف" data-i18n-label="lbl.cover"><div class="inner">' +
      '<div class="logo-slot"><img src="' + LOGO + '" alt="شعار مراكز الرعاية الصحية الأولية" data-i18n-alt="logo.alt"></div>' +
      '<h1 data-i18n="' + key + '">' + title + '</h1>' +
      '<p data-i18n="hero.sub">خدمات العلاج الطبيعي</p></div><div class="scroll-hint" aria-hidden="true"></div></section>';
  }
  var footerHTML =
    '<section class="slide footer" data-label="الختام" data-i18n-label="lbl.end"><div class="inner">' +
    '<div class="logo-slot rv" style="--i:0"><img src="' + LOGO + '" alt="شعار مراكز الرعاية الصحية الأولية" data-i18n-alt="logo.alt"></div>' +
    '<p class="rv" style="--i:1" data-i18n="ft.msg">عزيزي المراجع إذا لم تشعر بأي تحسن في حالتك، يرجى زيارة الطبيب.</p>' +
    '<p class="rv" style="--i:2" data-i18n="ft.msg2">مع تمنياتنا لك بالشفاء العاجل.</p>' +
    '<p class="contact rv" style="--i:3" data-i18n="ft.contact">خدمات العلاج الطبيعي | فريق الإصدارات</p></div></section>';

  [].slice.call(document.querySelectorAll('[data-phc]')).forEach(function (el) {
    var box = document.createElement('div');
    box.innerHTML = el.dataset.phc === 'hero'
      ? heroHTML(el.innerHTML.trim(), el.dataset.titleKey || 'hero.title')
      : footerHTML;
    el.replaceWith(box.firstElementChild);
  });

  /* ---------- languages funcion---------- */
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var dots = document.getElementById('dots');
  var bar = document.getElementById('progress');
  var langBtns = [].slice.call(document.querySelectorAll('.lang button'));
  var texts = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var alts = [].slice.call(document.querySelectorAll('[data-i18n-alt]'));
  var arTitle = document.title, arNav = dots.getAttribute('aria-label');

  texts.forEach(function (n) { n._ar = n.innerHTML });
  alts.forEach(function (n) { n._ar = n.getAttribute('alt') });
  slides.forEach(function (s) { s._ar = s.dataset.label });

  function tr(lang, key, fb) { var d = T[lang]; return (d && d[key] != null) ? d[key] : fb }
  function labelOf(s, i, lang) { return tr(lang, s.dataset.i18nLabel, s._ar) || ('#' + (i + 1)) }

  slides.forEach(function (s) {
    var b = document.createElement('button');
    b.onclick = function () { s.scrollIntoView({ behavior: 'smooth' }) };
    dots.appendChild(b);
  });
  var btns = [].slice.call(dots.children);

  function current() {
    var c = 0, m = 1e9;
    slides.forEach(function (s, i) { var d = Math.abs(s.getBoundingClientRect().top); if (d < m) { m = d; c = i } });
    return c;
  }

  function setLang(lang, user) {
    if (!DIR[lang]) lang = 'ar';
    var keep = user ? current() : -1, html = document.documentElement;
    html.lang = lang; html.dir = DIR[lang];
    document.title = tr(lang, 'doc.title', arTitle);
    dots.setAttribute('aria-label', tr(lang, 'nav.label', arNav));
    texts.forEach(function (n) { n.innerHTML = tr(lang, n.dataset.i18n, n._ar) });
    alts.forEach(function (n) { n.setAttribute('alt', tr(lang, n.dataset.i18nAlt, n._ar)) });
    slides.forEach(function (s, i) {
      var l = labelOf(s, i, lang);
      s.dataset.label = l; btns[i].setAttribute('aria-label', l); btns[i].title = l;
    });
    langBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === lang) });
    try { localStorage.setItem('phc-lang', lang) } catch (e) { }
    try { var u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u) } catch (e) { }
    if (keep > -1) slides[keep].scrollIntoView({ behavior: 'instant' });
  }
  langBtns.forEach(function (b) { b.onclick = function () { setLang(b.dataset.lang, true) } });


  /* save languages between pages */
  var start = 'ar';
  try { start = new URLSearchParams(location.search).get('lang') || localStorage.getItem('phc-lang') || 'ar' } catch (e) { }
  setLang(start, false);

  /* ---------- animations and video ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var on = e.isIntersecting && (e.intersectionRatio >= .45 || e.intersectionRect.height >= innerHeight * .5);
      var i = slides.indexOf(e.target), v = e.target.querySelector('video');
      if (on) {
        e.target.classList.add('in');
        btns.forEach(function (b, k) { b.classList.toggle('on', k === i) });
        if (v) v.play().catch(function () { });
      } else if (!e.isIntersecting) {
        e.target.classList.remove('in');
        if (v) v.pause();
      }
    });
  }, { threshold: [0, .1, .2, .3, .45, .6, .8, 1] });
  slides.forEach(function (s) { io.observe(s) });

  function prog() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  }
  addEventListener('scroll', prog, { passive: true }); prog();

  addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('button, video, a, input')) return;
    var k = e.key, i = current();
    if (k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); slides[Math.min(i + 1, slides.length - 1)].scrollIntoView({ behavior: 'smooth' }) }
    if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); slides[Math.max(i - 1, 0)].scrollIntoView({ behavior: 'smooth' }) }
  });
})();
