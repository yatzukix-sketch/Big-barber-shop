(() => {
  'use strict';

  const translatedNodes = [...document.querySelectorAll('[data-i18n]')];
  const ariaNodes = [...document.querySelectorAll('[data-i18n-aria]')];
  const altNodes = [...document.querySelectorAll('[data-i18n-alt]')];
  const defaults = { text: {}, aria: {}, alt: {} };
  translatedNodes.forEach(node => { defaults.text[node.dataset.i18n] ??= node.textContent; });
  ariaNodes.forEach(node => { defaults.aria[node.dataset.i18nAria] ??= node.getAttribute('aria-label'); });
  altNodes.forEach(node => { defaults.alt[node.dataset.i18nAlt] ??= node.getAttribute('alt'); });

  const tr = {
    skip: 'İçeriğe geç',
    brandHome: 'ana sayfaya dön',
    topTag: 'LOLLAR’DAKİ BERBERİN',
    navServices: 'Hizmetler',
    navAbout: 'Hakkımızda',
    navReviews: 'Yorumlar',
    navContact: 'İletişim',
    headerCall: 'Randevu için ara',
    heroEyebrow: 'BIG BARBERSHOP · LOLLAR',
    heroFirst: 'İyi bir stil.',
    heroSecond: 'İyi hisset.',
    heroDescription: 'Sana özel kesimler. İnce işçilik. Kendini iyi hissedeceğin bir deneyim. Lollar’daki Big Barbershop’a hoş geldin.',
    heroCall: 'Hemen ara',
    heroServices: 'Hizmetleri keşfet',
    heroReviews: '46 Google değerlendirmesi',
    scroll: 'DAHA FAZLASINI KEŞFET',
    shopLabel: 'DÜKKÂNIMIZ · LOLLAR',
    quality1: 'Özenli kesimler',
    quality1sub: 'SANA YAKIŞAN TARZ',
    quality2: 'Özenli detaylar',
    quality2sub: 'SON DOKUNUŞA KADAR',
    quality3: 'Lollar’ın merkezinde',
    quality3sub: 'YAKININDAKİ BERBER',
    servicesEyebrow: '01 / HİZMETLERİMİZ',
    servicesTitle1: 'Senin tarzın.',
    servicesTitle2: 'Bizim ustalığımız.',
    servicesDescription: 'Klasik ya da modern: Sana yakışan kesimi birlikte bulalım. Detaylara özen göstererek.',
    servicesCall: 'TELEFONLA RANDEVU İSTE',
    serviceCut: 'Saç kesimi',
    serviceCutDesc: 'Klasik veya modern. Her zaman sana özel.',
    serviceFade: 'Fade & kontur',
    serviceFadeDesc: 'Temiz geçişler ve net çizgiler.',
    serviceBeard: 'Sakal bakımı',
    serviceBeardDesc: 'Sakalına yakışan doğru form.',
    serviceNote: 'Fiyat ve müsaitlik bilgisi için bizi arayabilirsin.',
    craftEyebrow: '02 / İŞTE BIG',
    craftTitle1: 'Küçük detaylar.',
    craftTitle2: 'Büyük fark.',
    craftDescription: 'Herkesin tarzı farklı. Bu yüzden seni dinliyor, zaman ayırıyor ve ilk kesimden son kontura kadar detaylara özen gösteriyoruz.',
    craftCaption: 'BERBER KOLTUKLARI & AYNA',
    craftPoint1: 'Sana yakışan bir tarz',
    craftPoint2: 'Her detayda özen',
    craftPoint3: 'Rahat bir berber atmosferi',
    craftCta: 'Lollar’da bizi ziyaret et',
    reviewsEyebrow: '03 / SİZİN SÖZLERİNİZ',
    reviewsTitle1: 'İyi kesimler.',
    reviewsTitle2: 'Güzel sözler.',
    reviewsSummary: 'Google’da 46 değerlendirme',
    reviewsDate: 'Ekim 2026 itibarıyla',
    quote1: '“Zaman ayırıyor, isteklerinize çok güzel uyum sağlıyorlar. Kesinlikle tavsiye ederim.”',
    quote2: '“İki kuaför de gerçekten çok iyi kesiyor ve temiz, profesyonel bir kesim için zaman ayırıyor.”',
    quote3: '“Çok güler yüzlü personel! Kalite harika, hijyene çok dikkat ediliyor ve randevulara zamanında uyuluyor.”',
    reviewSource: 'Google yorumu · Çeviri',
    reviewsLink: 'GOOGLE’DA TÜM YORUMLAR',
    reviewsNote: 'Herkese açık Google yorumlarından alıntılar; çeviridir.',
    contactEyebrow: '04 / SENİ BEKLİYORUZ',
    contactTitle1: 'Sana yakışan',
    contactTitle2: 'yeni kesim.',
    contactDescription: 'Yeni bir görünüme hazır mısın? Bizi ara veya Lollar’daki dükkânımıza uğra.',
    contactCall: 'Randevu için ara',
    addressHeading: 'ADRES',
    directions: 'YOL TARİFİ AL',
    phoneHeading: 'TELEFON',
    hoursHeading: 'ÇALIŞMA SAATLERİ',
    daysMonThu: 'Pazartesi – Perşembe',
    dayFriday: 'Cuma',
    daySaturday: 'Cumartesi',
    daySunday: 'Pazar',
    closed: 'Kapalı',
    hoursNote: 'Google Haritalar’a göre · Ekim 2026 itibarıyla. Resmî tatillerde saatler değişebilir.',
    footerTagline: 'İyi bir stil. İyi hisset.',
    floatingCall: 'Ara',
    legalImprint: 'Künye',
    legalPrivacy: 'Gizlilik'
  };
  const trAria = {
    announcementAria: 'İletişim bilgileri',
    quickContactAria: 'Hızlı iletişim',

    navAria: 'Ana menü',
    mobileNavAria: 'Mobil menü',
    languageAria: 'Dil seç',
    ratingAria: 'Google Haritalar’da 5 üzerinden 4,7, 46 değerlendirme',
    fiveStarsAria: '5 üzerinden 5 yıldız',
    mapLinkAria: 'Big Barbershop’u Google Haritalar’da aç',
    topAria: 'Yukarı çık'
  };
  const trAlt = {
    heroAlt: 'Big Barbershop’un Lollar’daki iç mekânı',
    craftAlt: 'Lollar’daki Big Barbershop’ta berber koltukları ve aynalar',
    mapAlt: 'Big Barbershop’un Lollar’daki konumunu gösteren harita',
    mapLogoAlt: 'Big Barbershop logosu',
    emblemAlt: 'Big Barbershop logosu: makas, berber direği ve ustura'
  };
  const titles = {
    de: 'Big Barbershop | Dein Barber in Lollar',
    tr: 'Big Barbershop | Lollar’daki berberin'
  };
  const descriptions = {
    de: 'Big Barbershop in Lollar: individuelle Haarschnitte, saubere Fades und Bartpflege. Besuche uns in der Marburger Str. 25 oder ruf uns an.',
    tr: 'Lollar’daki Big Barbershop: sana özel saç kesimi, fade ve sakal bakımı. Marburger Str. 25 adresinde bizi ziyaret et veya ara.'
  };

  let language = 'de';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const languages = [...document.querySelectorAll('[data-language]')];
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
  const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
  const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');

  function updateMenuLabel() {
    if (!menuButton) return;
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', language === 'tr'
      ? (isOpen ? 'Menüyü kapat' : 'Menüyü aç')
      : (isOpen ? 'Menü schließen' : 'Menü öffnen'));
  }
  function setMenu(open) {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    updateMenuLabel();
  }
  function applyLanguage(next, remember = true) {
    language = next === 'tr' ? 'tr' : 'de';
    const useTurkish = language === 'tr';
    translatedNodes.forEach(node => {
      const key = node.dataset.i18n;
      node.textContent = (useTurkish ? tr[key] : defaults.text[key]) ?? defaults.text[key];
    });
    ariaNodes.forEach(node => {
      const key = node.dataset.i18nAria;
      node.setAttribute('aria-label', (useTurkish ? trAria[key] : defaults.aria[key]) ?? defaults.aria[key]);
    });
    altNodes.forEach(node => {
      const key = node.dataset.i18nAlt;
      node.setAttribute('alt', (useTurkish ? trAlt[key] : defaults.alt[key]) ?? defaults.alt[key]);
    });
    document.documentElement.lang = language;
    document.title = titles[language];
    if (descriptionMeta) descriptionMeta.setAttribute('content', descriptions[language]);
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', titles[language]);
    if (ogDescriptionMeta) ogDescriptionMeta.setAttribute('content', descriptions[language]);
    if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', titles[language]);
    if (twitterDescriptionMeta) twitterDescriptionMeta.setAttribute('content', descriptions[language]);
    languages.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    updateMenuLabel();
    if (remember) { try { localStorage.setItem('big-barbershop-language', language); } catch (_) {} }
  }

  languages.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem('big-barbershop-language'); } catch (_) {}
  applyLanguage(savedLanguage === 'tr' ? 'tr' : 'de', false);

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => setMenu(menu.hidden));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); }
    });
    document.addEventListener('click', event => {
      if (!menu.hidden && !event.target.closest('.site-header')) setMenu(false);
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 1000 && !menu.hidden) setMenu(false); });
  }

  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.desktop-nav [data-nav]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.dataset.nav === entry.target.id));
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
  const yearNode = document.getElementById('year');
  if (yearNode) yearNode.textContent = new Date().getFullYear();
})();
