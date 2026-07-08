// Builds the homepage from posts.json: the big "Latest breakdown" featured story,
// a 4-card "Latest Articles" grid, and a 4-card "Popular Articles" grid.
// Add new posts by adding an entry to posts.json — no other file needs to change.
// Flag an entry with "popular": true to put it in the Popular Articles grid.

(function () {
  const featuredEl = document.getElementById("featured");
  const latestGrid = document.getElementById("latest-grid");
  const popularGrid = document.getElementById("popular-grid");
  if (!featuredEl && !latestGrid && !popularGrid) return;

  const categoryLabels = {
    beginner: "Beginner Basics",
    strategy: "Trader Strategies",
    weird: "Weird Markets",
  };

  // small flat editorial-style icons, used as a fallback when a post has no real photo
  const ICONS = window.SITE_ICONS || {};

  function thumbHtml(thumb, title) {
    if (/\.(jpe?g|png|webp|gif|svg)$/i.test(thumb || "")) {
      return `<img src="${thumb}" alt="${title}" loading="lazy">`;
    }
    return ICONS[thumb] || ICONS.chart;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function renderFeatured(post) {
    if (!featuredEl || !post) return;
    featuredEl.innerHTML = `
      <a class="featured" href="${post.file}">
        <div class="featured-thumb">${thumbHtml(post.thumb, post.title)}</div>
        <div>
          <div class="featured-label">Latest breakdown</div>
          <div class="featured-meta">
            <span class="chip ${post.category}">${categoryLabels[post.category] || post.category}</span>
            <span>${formatDate(post.date)}</span>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <span class="read-more">Read the full breakdown →</span>
        </div>
      </a>`;
  }

  function renderGrid(el, list) {
    if (!el) return;
    if (list.length === 0) {
      el.innerHTML = '<div class="empty-state">No posts yet.</div>';
      return;
    }
    el.innerHTML = list
      .map(
        (p) => `
      <a class="article-card" href="${p.file}">
        <div class="article-thumb">${thumbHtml(p.thumb, p.title)}</div>
        <div class="article-body">
          <span class="chip ${p.category}">${categoryLabels[p.category] || p.category}</span>
          <h3>${p.title}</h3>
          <span class="article-date">${formatDate(p.date)}</span>
        </div>
      </a>`
      )
      .join("");
  }

  fetch("posts.json")
    .then((res) => res.json())
    .then((data) => {
      const posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      const featuredPost = posts.find((p) => p.featured) || posts[0] || null;

      renderFeatured(featuredPost);

      const latest = posts.filter((p) => p !== featuredPost).slice(0, 4);
      renderGrid(latestGrid, latest);

      const popular = posts.filter((p) => p.popular).slice(0, 4);
      const fallback = posts.filter((p) => !popular.includes(p) && p !== featuredPost);
      while (popular.length < 4 && fallback.length) {
        popular.push(fallback.shift());
      }
      renderGrid(popularGrid, popular);
    })
    .catch(() => {
      if (latestGrid) latestGrid.innerHTML = '<div class="empty-state">Couldn\'t load posts.json.</div>';
      if (popularGrid) popularGrid.innerHTML = '<div class="empty-state">Couldn\'t load posts.json.</div>';
    });
})();
