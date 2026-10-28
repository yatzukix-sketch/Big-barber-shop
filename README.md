# Big Barbershop — Lollar

Almanca (varsayılan) ve Türkçe dil seçenekli, mobil uyumlu, yayına hazır statik web sitesi.
İşletme: **Big Barbershop**, Marburger Str. 25, 35457 Lollar · Telefon: **+49 6406 7761862**

---

## 1. Ne var içinde

Bu ZIP **iki ayrı paket** içerir:

| Klasör | İçerik | Ne zaman kullanılır |
|---|---|---|
| **`dist/`** | Yayına hazır site (4 sayfa + varlıklar + sunucu yapılandırması) | Sunucuya yüklenecek / hosting'e atılacak dosya |
| **`src/` + `assets/` + `build.py`** | Kaynak dosyalar (şablonlar, CSS, JS, görseller, fontlar) | Siteyi değiştirmek/tekrar derlemek için |

`dist/` klasörünü olduğu gibi sunucuya kopyalamak yeterlidir. Sunucu tarafında **başka hiçbir şey** (PHP, veritabanı, Node.js) gerekmez.

---

## 2. `dist/` içeriği (yayınlanacak klasör)

```
dist/
├── index.html                 Ana sayfa (Almanca/Türkçe)
├── impressum.html             Künye (Impressum) — § 5 DDG
├── datenschutz.html           Gizlilik bildirimi — Art. 13 DSGVO
├── 404.html                   Bulunamadı sayfası
├── robots.txt                 Arama motoru yönergeleri
├── sitemap.xml                Site haritası
├── site.webmanifest           PWA manifesti (masaüstüne eklenebilir)
├── favicon.ico                Tarayıcı simgesi (çok boyutlu)
├── apple-touch-icon.png       iOS ana ekran simgesi (180×180)
├── vercel.json                Vercel için başlık (header) ayarları
├── netlify.toml               Netlify için başlık ayarları
├── .htaccess                  Apache için 404 + önbellek + güvenlik başlıkları
└── assets/
    ├── css/site.css           Ana stiller + @font-face
    ├── css/legal.css          Künye/gizlilik sayfası stilleri
    ├── js/app.js              Dil geçişi, menü, yıl
    ├── fonts/                 DMSans.woff2, DMSerifDisplay.woff2, DMSerifDisplay-italic.woff2
    └── img/                   hero, craft, map, logolar, og-image, favicon
```

**Harici bağımlılık yoktur.** Yazi tipleri, görseller ve harita kendi sunucunuzdan gelir; Google Fonts, CDN veya üçüncü taraf servis çağrısı yapılmaz. Bu nedenle çerez banner'ı gerekmez ve Datenschutz beyanı buna göre yazılmıştır.

---

## 3. ⚠️ Yayınlamadan ÖNCE mutlaka doldurulacaklar

Yasal sayfalardaki **sarı işaretli** alanlar (`[…]`) işletmeci tarafından doldurulmalıdır.
Bunlar `dist/impressum.html` ve `dist/datenschutz.html` içinde ve `src/` şablonlarında görünür.

### İşletmeci bilgileri (Impressum)

| Alan | Zorunlu mu? | Nerede |
|---|---|---|
| **İnhalame/inşaat** (ad soyad veya firma) | **Evet** | "Angaben gemäß § 5 DDG" ve "§ 18 Abs. 2 MStV" |
| **E-posta adresi** | **Evet** | "Angaben gemäß § 5 DDG" |
| USt-IdNr. | Varsa | "Umsatzsteuer-Identifikationsnummer" |
| Handelsregister + Registergericht + Registernummer | Varsa | "Handelsregistereintrag" |
| Berufshaftpflichtversicherung | Varsa | "Berufshaftpflichtversicherung" |

Bilinen zorunlu alanlar (telefon, adres, saatler) zaten yerleştirilmiştir.

### Alan adı

`src/site.config.json` içindeki `siteUrl` alanı şu an **placeholder** (`https://big-barbershop-lollar.de`).
Kendi alan adınızı aldığınızda:

```json
"siteUrl": "https://www.sizin-alan-adiniz.de"
```

yazıp `python3 build.py` çalıştırın. Bu değer **canonical etiketi, og:url, sitemap.xml ve robots.txt** içinde kullanılır — değiştirmezseniz arama motorları yanlış adresi işaretler.

---

## 4. Yayın (hosting) seçenekleri

### A) Vercel (ücretsiz, önerilen)

1. [vercel.com](https://vercel.com) → hesap açın / giriş yapın.
2. **Add New → Project** → **Deploy** (Git bağlamadan yükleme yapacaksınız).
3. Proje adı verin, framework **"Other"** seçin.
4. **Deployments → ... → ⋮ → Upload Files** veya CLI ile:
   ```bash
   npm i -g vercel
   cd dist
   vercel --prod
   ```
5. Vercel otomatik olarak `vercel.json` içindeki güvenlik başlıklarını ve 1 yıllık önbellek ayarlarını uygular.
6. Domain eklemek için: **Settings → Domains** → alan adınızı girin, ardından DNS kaydını verilen değerlerle oluşturun.

### B) Netlify

[app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually** → `dist/` klasörünü sürükleyip bırakın. `netlify.toml` otomatik uygulanır.

### C) Normal web hosting (klasör yükleme)

`dist/` klasörünün **içindekilerini** FTP ile `public_html` (veya `www`) klasörüne yükleyin. `.htaccess` dosyasının gizli dosya olarak yüklenmesine dikkat edin (FTP istemcisi "dotfile" ayarı).

### D) Netlify/Vercel dışında statik hosting

Başka bir statik barındırıcı da aynı `dist/` klasörünü kullanabilir; `robots.txt`, `sitemap.xml` ve `site.webmanifest` standarttır.

---

## 5. Domain alındıktan sonra yapılacaklar

1. `src/site.config.json` → `siteUrl` güncellenir.
2. `python3 build.py` çalıştırılır.
3. `dist/` yeniden yüklenir.
4. [Google Search Console](https://search.google.com/search-console) → site eklenir, `sitemap.xml` gönderilir.
5. [Google Business Profile](https://business.google.com) → web sitesi alan adı olarak bu adres girilir (yerel SEO için en etkili adım).
6. İsterseniz alan adı **HTTPS**'e yönlendirilir (Vercel/Netlify bunu otomatik yapar).

---

## 6. Yeniden derleme (siteyi değiştirmek için)

```bash
cd big-barbershop
python3 build.py        # dist/ klasörünü yeniden üretir
```

Gereken Python: sadece standart kütüphane (`json`, `shutil`, `pathlib`) — ek paket gerekmez.

### Nereden ne değiştirilir

| Değişiklik | Dosya |
|---|---|
| Telefon, adres, saatler, alan adı | `src/site.config.json` |
| Sayfa metinleri (Almanca) | `src/index.template.html` |
| Türkçe çeviriler | `src/app.js` → `tr` sözlüğü |
| Renkler, tipografi, düzen | `src/styles.css` |
| Künye / gizlilik metinleri | `src/impressum.template.html`, `src/datenschutz.template.html` |
| Künye/gizlilik sayfası stilleri | `src/legal.css` |

> Metin değiştirdiğinizde Almanca ve Türkçe versiyonları **birlikte** güncelleyin (Almanca şablonlarda, Türkçe `src/app.js` içinde).

### Yeni görsel eklemek

Görseli `assets/` içine aynı adla kopyalayın, `src/index.template.html` içindeki `src="assets/img/..."` yolunu güncelleyin, `build.py` içindeki dosya listesine adını ekleyin.

---

## 7. Performans ve erişilebilirlik (test edilmiş)

`dist/` klasörü 636 KB toplam; ana sayfa ilk yüklemede **389 KB** transfer, 12 istek.

- **Fontlar altkümelendi**: DM Sans + DM Serif Display (normal + italik) → toplam **109 KB**. Türkçe karakterler dahil (ğ, ş, ı, İ, ç, ö, ü).
- **Görseller**: hero 3 boyutta (masaüstü/tablet/mobil) `<picture>` ile sunulur; WebP formatında.
- **Erişilebilirlik**: axe-core (WCAG 2.1 AA) taraması — **3 sayfa × 2 cihaz = 0 ihlal**.
- **Duyarlılık**: 320 / 360 / 390 / 768 / 1024 / 1440 / 1920 px — yatay taşma yok.
- **Konsol**: JavaScript hatası yok.
- **Dil geçişi**: DE/TR çalışıyor, seçim `localStorage`'da saklanıyor, sayfa yenilendiğinde korunuyor.
- **SEO**: canonical, Open Graph, Twitter Card, `BarberShop` JSON-LD (adres, çalışma saatleri, coğrafi konum), `robots.txt`, `sitemap.xml`.

---

## 8. Kaynak dosyalar hakkında

- **Gerçek dükkân fotoğrafı**: işletmenin paylaştığı `IMG_3081.jpeg` (hero + "Das ist Big" bölümü). Sitede artık **hiçbir yapay zekâ görseli yoktur**.
- **Logo**: işletmenin paylaştığı `IMG_3082.jpeg` temizlenip şeffaf WebP sürümlere dönüştürüldü (`assets/img/logo-*.webp`).
- **Harita**: OpenStreetMap döşemelerinden statik görsel, © OpenStreetMap-Mitwirkende atfı ile.

---

## 9. Lisanslar

- DM Sans, DM Serif Display — SIL Open Font License 1.1 (`licenses/`)
- Harita verileri — © [OpenStreetMap katkıda bulunanları](https://www.openstreetmap.org/copyright)
