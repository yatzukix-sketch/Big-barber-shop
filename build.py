#!/usr/bin/env python3
"""Big Barbershop – statik site derleyicisi.

Çıktı: dist/
  index.html, impressum.html, datenschutz.html, 404.html,
  robots.txt, sitemap.xml, site.webmanifest,
  assets/css/{site,legal}.css, assets/js/app.js,
  assets/fonts/*.woff2, assets/img/*.webp|jpg|png
"""
from __future__ import annotations

import json
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
ASSETS = ROOT / "assets"
DIST = ROOT / "dist"

MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
              "August", "September", "Oktober", "November", "Dezember"]


def load_config() -> dict:
    return json.loads((SRC / "site.config.json").read_text(encoding="utf-8"))


def todo(text: str) -> str:
    """Henüz bilinmeyen bilgiyi işaretli placeholder olarak bas."""
    return f'<span class="todo">[{text}]</span>'


def build_placeholders(cfg: dict) -> dict[str, str]:
    today = date.today()
    site_url = cfg["siteUrl"].rstrip("/")
    owner = cfg.get("ownerName", "").strip()
    email = cfg.get("email", "").strip()

    return {
        "__SITE_URL__": site_url,
        "__SITE_URL_WWW__": site_url.replace("https://", "").replace("http://", ""),
        "__OWNER_NAME__": owner if owner else todo("Inhabername eintragen"),
        "__EMAIL__": email if email else todo("E-Mail-Adresse eintragen"),
        "__EMAIL_LINK__": f'<a href="mailto:{email}">{email}</a>' if email else todo("E-Mail-Adresse eintragen"),
        "__PHONE_HREF__": cfg["phoneHref"],
        "__PHONE_DISPLAY__": cfg["phoneDisplay"],
        "__STREET__": cfg["street"],
        "__POSTAL_CODE__": cfg["postalCode"],
        "__CITY__": cfg["city"],
        "__YEAR__": str(today.year),
        "__YEAR_MONTH__": f"{MONTHS_DE[today.month - 1]} {today.year}",
    }


def render(template: str, mapping: dict[str, str]) -> str:
    """Placeholder'ları değiştirir.

    Uzun anahtarlar önce işlenir; aksi halde "__EMAIL__" gibi bir ön ek,
    "__EMAIL_LINK__" placeholder'ının içinde yanlışlıkla eşleşir.
    """
    out = template
    for key in sorted(mapping, key=len, reverse=True):
        out = out.replace(key, mapping[key])
    return out


def main() -> int:
    cfg = load_config()
    mapping = build_placeholders(cfg)

    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets" / "css").mkdir(parents=True)
    (DIST / "assets" / "js").mkdir(parents=True)
    (DIST / "assets" / "img").mkdir(parents=True)
    (DIST / "assets" / "fonts").mkdir(parents=True)

    # --- HTML sayfaları -------------------------------------------------
    index_tpl = (SRC / "index.template.html").read_text(encoding="utf-8")
    impressum_tpl = (SRC / "impressum.template.html").read_text(encoding="utf-8")
    datenschutz_tpl = (SRC / "datenschutz.template.html").read_text(encoding="utf-8")

    (DIST / "index.html").write_text(render(index_tpl, mapping), encoding="utf-8")
    (DIST / "impressum.html").write_text(render(impressum_tpl, mapping), encoding="utf-8")
    (DIST / "datenschutz.html").write_text(render(datenschutz_tpl, mapping), encoding="utf-8")

    # --- 404 -----------------------------------------------------------
    not_found = (DIST / "index.html").read_text(encoding="utf-8")
    not_found = not_found.replace(
        "<main id=\"inhalt\">",
        """<main id="inhalt">
    <section class="hero" aria-labelledby="nf-title">
      <div class="hero-shade"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <div class="eyebrow eyebrow-light"><span class="eyebrow-line"></span><span>FEHLER 404</span></div>
          <h1 id="nf-title">Diese Seite<br><em>gibt es nicht.</em></h1>
          <p class="hero-description">Die Adresse wurde vermutlich falsch eingegeben. Der Weg zurück ist nicht weit.</p>
          <div class="hero-actions"><a class="button button-cream" href="/"><span>Zur Startseite</span></a></div>
        </div>
      </div>
    </section>""",
    )
    (DIST / "404.html").write_text(not_found, encoding="utf-8")

    # --- CSS / JS ------------------------------------------------------
    shutil.copyfile(SRC / "styles.css", DIST / "assets" / "css" / "site.css")
    shutil.copyfile(SRC / "legal.css", DIST / "assets" / "css" / "legal.css")
    shutil.copyfile(SRC / "app.js", DIST / "assets" / "js" / "app.js")

    # --- Fontlar -------------------------------------------------------
    for font in sorted((ASSETS / "fonts").glob("*.woff2")):
        shutil.copyfile(font, DIST / "assets" / "fonts" / font.name)

    # --- Görseller -----------------------------------------------------
    for name in ["shop-800.webp", "hero-1600.webp", "hero-1000.webp",
                 "craft.webp", "map.webp",
                 "logo-wordmark.webp", "logo-wordmark-ink.webp", "logo-emblem.webp",
                 "favicon.png", "og-image.jpg"]:
        source = ASSETS / name
        if source.exists():
            shutil.copyfile(source, DIST / "assets" / "img" / name)
    for name in ["favicon.ico", "apple-touch-icon.png"]:
        source = ASSETS / name
        if source.exists():
            shutil.copyfile(source, DIST / name)

    # --- robots.txt / sitemap.xml / manifest ---------------------------
    site_url = cfg["siteUrl"].rstrip("/")
    (DIST / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {site_url}/sitemap.xml\n",
        encoding="utf-8",
    )
    (DIST / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{site_url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n"
        f"  <url><loc>{site_url}/impressum.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>\n"
        f"  <url><loc>{site_url}/datenschutz.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>\n"
        "</urlset>\n",
        encoding="utf-8",
    )
    (DIST / "site.webmanifest").write_text(
        json.dumps({
            "name": "Big Barbershop – Lollar",
            "short_name": "Big Barbershop",
            "lang": "de",
            "start_url": "/",
            "display": "standalone",
            "background_color": "#191b18",
            "theme_color": "#171815",
            "icons": [
                {"src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"},
                {"src": "/favicon.ico", "sizes": "any", "type": "image/x-icon"},
            ],
        }, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    # --- Sunucu yapılandırması (Vercel / Netlify uyumlu) ---------------
    (DIST / "vercel.json").write_text(
        json.dumps({
            "trailingSlash": False,
            "headers": [
                {
                    "source": "/assets/(.*)",
                    "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}],
                },
                {
                    "source": "/(.*)",
                    "headers": [
                        {"key": "X-Content-Type-Options", "value": "nosniff"},
                        {"key": "X-Frame-Options", "value": "SAMEORIGIN"},
                        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
                        {"key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=(), interest-cohort=()"},
                        {"key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload"},
                    ],
                },
            ],
        }, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (DIST / "netlify.toml").write_text(
        '[[headers]]\n'
        '  for = "/assets/*"\n'
        '  [headers.values]\n'
        '    Cache-Control = "public, max-age=31536000, immutable"\n\n'
        '[[headers]]\n'
        '  for = "/*"\n'
        '  [headers.values]\n'
        '    X-Content-Type-Options = "nosniff"\n'
        '    X-Frame-Options = "SAMEORIGIN"\n'
        '    Referrer-Policy = "strict-origin-when-cross-origin"\n'
        '    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"\n',
        encoding="utf-8",
    )
    (DIST / ".htaccess").write_text(
        "ErrorDocument 404 /404.html\n"
        "<IfModule mod_headers.c>\n"
        "  Header set X-Content-Type-Options \"nosniff\"\n"
        "  Header set Referrer-Policy \"strict-origin-when-cross-origin\"\n"
        "  Header set Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\"\n"
        "</IfModule>\n"
        "<IfModule mod_expires.c>\n"
        "  ExpiresActive On\n"
        "  ExpiresByType text/css \"access plus 1 year\"\n"
        "  ExpiresByType application/javascript \"access plus 1 year\"\n"
        "  ExpiresByType font/woff2 \"access plus 1 year\"\n"
        "  ExpiresByType image/webp \"access plus 1 year\"\n"
        "  ExpiresByType image/png \"access plus 1 year\"\n"
        "  ExpiresByType image/jpeg \"access plus 1 year\"\n"
        "</IfModule>\n",
        encoding="utf-8",
    )

    # --- Özet ----------------------------------------------------------
    total = sum(f.stat().st_size for f in DIST.rglob("*") if f.is_file())
    pages = [p.name for p in sorted(DIST.glob("*.html"))]
    print(f"Build tamamlandı -> {DIST}")
    print(f"  Sayfalar   : {', '.join(pages)}")
    print(f"  Toplam     : {total/1024:.0f} KB")
    print(f"  Alan adı   : {site_url}  (src/site.config.json içinde değiştirilebilir)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
