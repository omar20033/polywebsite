// Builds the "Related Articles" grid at the end of a post from posts.json,
// excluding the current post. Add new posts to posts.json and they're
// automatically eligible to show up here — nothing else to maintain.

(function () {
  const container = document.getElementById("related");
  if (!container) return;

  const root = window.SITE_ROOT || "";
  const currentFile = document.body.getAttribute("data-post-file");
  const ICONS = window.SITE_ICONS || {};
  const categoryLabels = {
    beginner: "Beginner Basics",
    strategy: "Trader Strategies",
    howto: "How To",
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  fetch(root + "posts.json")
    .then((res) => res.json())
    .then((data) => {
      const others = shuffle(
        data.filter((p) => p.file !== currentFile)
      ).slice(0, 8);

      if (others.length === 0) {
        container.remove();
        return;
      }

      container.innerHTML = `
        <h3 class="related-title">Related Articles</h3>
        <div class="related-grid">
          ${others
            .map(
              (p) => `
            <a class="related-card" href="${root}${p.file}">
<div class="related-thumb">
  <img src="${root}${p.thumb}" alt="${p.title}" loading="lazy">
</div>              <span class="chip ${p.category}">${categoryLabels[p.category] || p.category}</span>
              <h4>${p.title}</h4>
              <span class="related-author">By ${p.author || "predictionmarketsacademy Team"}</span>
            </a>`
            )
            .join("")}
        </div>`;
    })
    .catch(() => {
      container.remove();
    });
})();