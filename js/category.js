// Builds the card grid on a category page (beginner.html / strategy.html / weird.html)
// from posts.json, filtered to that page's category. Set window.CATEGORY before this
// script runs (see each category page's <script> tag).

(function () {
  const grid = document.getElementById("card-grid");
  const countEl = document.getElementById("filter-count");
  if (!grid) return;

  const category = window.CATEGORY;
  const root = window.SITE_ROOT || "";

  const categoryLabels = {
    beginner: "Beginner Basics",
    strategy: "Trader Strategies",
    weird: "Weird Markets",
  };

  const ICONS = window.SITE_ICONS || {};

  function thumbHtml(thumb, title) {
    if (/\.(jpe?g|png|webp|gif|svg)$/i.test(thumb || "")) {
      return `<img src="${root}${thumb}" alt="${title}" loading="lazy">`;
    }
    return ICONS[thumb] || ICONS.chart;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  fetch(root + "posts.json")
    .then((res) => res.json())
    .then((data) => {
      const posts = data
        .filter((p) => p.category === category)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      if (countEl) {
        countEl.textContent = posts.length + (posts.length === 1 ? " post" : " posts");
      }

      if (posts.length === 0) {
        grid.innerHTML = '<div class="empty-state">No posts in this category yet.</div>';
        return;
      }

      grid.innerHTML = posts
        .map(
          (p) => `
        <a class="card" href="${root}${p.file}">
          <div class="card-thumb">${thumbHtml(p.thumb, p.title)}</div>
          <div class="card-body">
            <div class="card-meta">
              <span class="chip ${p.category}">${categoryLabels[p.category] || p.category}</span>
              <span>${formatDate(p.date)}</span>
            </div>
            <h2>${p.title}</h2>
            <p>${p.excerpt}</p>
          </div>
        </a>`
        )
        .join("");
    })
    .catch(() => {
      grid.innerHTML = '<div class="empty-state">Couldn\'t load posts.json.</div>';
    });
})();
