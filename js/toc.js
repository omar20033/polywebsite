// Builds the left-hand Table of Contents on post pages from the <h2> headings
// inside #post-body — no manual list to maintain per post.

(function () {
  const tocCard = document.getElementById("toc");
  const tocNav = document.getElementById("toc-nav");
  const body = document.getElementById("post-body");
  if (!tocCard || !tocNav || !body) return;

  const headings = Array.from(body.querySelectorAll("h2"));
  if (headings.length < 2) {
    // not enough sections to make a contents list worthwhile
    tocCard.remove();
    return;
  }

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  headings.forEach((h, i) => {
    if (!h.id) h.id = slugify(h.textContent) || "section-" + i;
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    tocNav.appendChild(a);
  });

  const links = Array.from(tocNav.querySelectorAll("a"));

  const setActive = (id) => {
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
  );

  headings.forEach((h) => observer.observe(h));
  setActive(headings[0].id);
})();
