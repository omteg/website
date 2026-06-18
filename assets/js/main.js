document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
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
    const status = document.querySelector("#form-status");
    const attachmentInput = document.querySelector("#attachment");
    const attachmentName = document.querySelector("#attachment-name");
    const hasSubmitted = new URLSearchParams(window.location.search).get("submitted") === "true";
    const maxAttachmentBytes = 5 * 1024 * 1024;

    if (status && hasSubmitted) {
      status.hidden = false;
      status.className = "form-status success";
      status.textContent = "Request transmitted successfully. Our operations desk has received your message.";
    }

    if (attachmentInput && attachmentName) {
      attachmentInput.addEventListener("change", () => {
        const file = attachmentInput.files && attachmentInput.files[0];
        attachmentName.textContent = file ? file.name : "No file selected";
      });
    }

    form.addEventListener("submit", event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      const file = attachmentInput && attachmentInput.files ? attachmentInput.files[0] : null;
      if (file && file.size > maxAttachmentBytes) {
        event.preventDefault();
        if (status) {
          status.hidden = false;
          status.className = "form-status error";
          status.textContent = "Attachment is larger than 5MB. Please upload a smaller file.";
        }
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
        submitButton.textContent = "Submitting...";
      }
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
