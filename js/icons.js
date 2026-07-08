// Small flat editorial-style icons, standing in for photos on cards/thumbnails.
// Shared by js/posts.js (homepage grid) and js/related.js (related-articles section).

window.SITE_ICONS = {
  coin: `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="48" r="30" fill="#FBEBD3" stroke="#B8791A" stroke-width="2"/>
    <circle cx="48" cy="48" r="21" fill="none" stroke="#B8791A" stroke-width="1.4"/>
    <text x="48" y="55" font-family="IBM Plex Mono" font-size="18" fill="#B8791A" text-anchor="middle">%</text>
  </svg>`,
  ledger: `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="18" width="48" height="60" rx="4" fill="#FBEBD3" stroke="#B8791A" stroke-width="2"/>
    <line x1="33" y1="34" x2="63" y2="34" stroke="#B8791A" stroke-width="2"/>
    <line x1="33" y1="46" x2="63" y2="46" stroke="#B8791A" stroke-width="2"/>
    <line x1="33" y1="58" x2="52" y2="58" stroke="#B8791A" stroke-width="2"/>
  </svg>`,
  chart: `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16" width="64" height="64" rx="4" fill="#DBF3EA" stroke="#0E8F6E" stroke-width="2"/>
    <polyline points="24,64 38,50 50,58 64,32 72,40" fill="none" stroke="#0E8F6E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="64" cy="32" r="3" fill="#0E8F6E"/>
  </svg>`,
  profile: `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="48" r="30" fill="#DBF3EA" stroke="#0E8F6E" stroke-width="2"/>
    <circle cx="48" cy="40" r="9" fill="none" stroke="#0E8F6E" stroke-width="2.5"/>
    <path d="M30 68c3-11 12-17 18-17s15 6 18 17" fill="none" stroke="#0E8F6E" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
};
