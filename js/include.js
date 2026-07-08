// Injects partials/navbar.html and partials/footer.html into any page
// that has <div data-include="navbar"></div> / <div data-include="footer"></div>.
//
// Each page sets `window.SITE_ROOT` before this script runs:
//   - "" for pages at the site root (index.html, about.html)
//   - "../" for pages one folder deep (posts/*.html)

(function () {
  const root = window.SITE_ROOT || "";

  document.querySelectorAll("[data-include]").forEach((el) => {
    const name = el.getAttribute("data-include");
    fetch(root + "partials/" + name + ".html")
      .then((res) => res.text())
      .then((html) => {
        // rewrite root-relative links ("/index.html") to work from this page's depth
        el.innerHTML = html.replaceAll('href="/', 'href="' + root);
        el.dispatchEvent(new CustomEvent("include:loaded", { bubbles: true }));

        if (name === "navbar") {
          const toggle = el.querySelector("#nav-toggle");
          const links = el.querySelector("#nav-links");
          if (toggle && links) {
            toggle.addEventListener("click", () => {
              const isOpen = links.classList.toggle("open");
              toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            });
            links.querySelectorAll("a").forEach((a) => {
              a.addEventListener("click", () => {
                links.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
              });
            });
          }
        }
      })
      .catch(() => {
        el.innerHTML = "";
      });
  });
})();
