document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thank you. Your message has been received and OMTEG will respond shortly.");
      form.reset();
    });
  }

  const currentPath = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = new URL(href, window.location.origin).pathname.replace(/index\.html$/, "");
    if (target === currentPath || (target !== "/" && currentPath.startsWith(target))) {
      link.classList.add("active");
    }
  });
});
