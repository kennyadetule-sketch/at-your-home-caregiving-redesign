(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function applyConfig() {
    document.documentElement.style.setProperty("--primary", BUSINESS.primaryColor);
    document.documentElement.style.setProperty("--secondary", BUSINESS.secondaryColor);
    document.documentElement.style.setProperty("--accent", BUSINESS.accentColor);
    $$("[data-business]").forEach(el => {
      const key = el.dataset.business;
      if (key === "phone") { el.textContent = BUSINESS.phoneDisplay; el.href = `tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`; }
      else if (key === "email") { el.textContent = BUSINESS.email; el.href = `mailto:${BUSINESS.email}`; }
      else if (key === "address") { el.textContent = BUSINESS.address; }
      else if (key === "name") el.textContent = BUSINESS.name;
      else if (key === "shortName") el.textContent = BUSINESS.shortName;
      else if (key === "tagline") el.textContent = BUSINESS.tagline;
      else if (key === "facebook") { if (BUSINESS.facebook) el.href = BUSINESS.facebook; else el.hidden = true; }
      else if (key === "instagram") { if (BUSINESS.instagram) el.href = BUSINESS.instagram; else el.hidden = true; }
      else if (key === "maps") el.href = BUSINESS.googleMaps;
      else if (key === "whatsapp") el.href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hello, I would like to learn more about your caregiving services.")}`;
      else if (key === "reviews") el.href = BUSINESS.googleReviewSearch;
    });
    $$("[data-logo]").forEach(img => { img.src = BUSINESS.logo; img.alt = `${BUSINESS.shortName} logo`; });
    $$("[data-hours]").forEach(el => {
      const day = el.dataset.hours;
      el.textContent = `${day[0].toUpperCase()}${day.slice(1)} — ${BUSINESS.openingHours[day] || "Please call to confirm"}`;
    });
    $$("[data-service-list]").forEach(container => {
      container.innerHTML = BUSINESS.services.map((s, i) => `
        <article class="service-card reveal">
          <div class="service-icon" aria-hidden="true">${icon(s.icon)}</div>
          <p class="eyebrow">Care service ${String(i + 1).padStart(2, "0")}</p>
          <h3>${s.title}</h3><p>${s.text}</p>
          <a class="text-link" href="contact.html">Discuss care needs <span aria-hidden="true">↗</span></a>
        </article>`).join("");
    });
    $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    $$("[data-phone-link]").forEach(el => el.href = `tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`);
    $$("[data-map-frame]").forEach(frame => {
      frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&output=embed`;
      frame.title = `Map showing ${BUSINESS.shortName}`;
    });
  }

  function icon(name) {
    const paths = {
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
      leaf: '<path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 10-8 8-16Z"/><path d="M4 21c3-5 6-8 12-12"/>',
      home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-6h6v6"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/>',
      activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2"/><path d="M17 5a3 3 0 0 1 0 6m4 9v-2a5 5 0 0 0-3-4.6"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
    };
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.heart}</svg>`;
  }

  function setupMenu() {
    const menu = $("#site-menu"), toggle = $(".menu-toggle"), close = $(".menu-close"), scrim = $(".menu-scrim");
    if (!menu || !toggle) return;
    const setOpen = open => {
      menu.classList.toggle("is-open", open);
      scrim?.classList.toggle("is-visible", open);
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      if (open) close?.focus(); else toggle.focus();
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    close?.addEventListener("click", () => setOpen(false));
    scrim?.addEventListener("click", () => setOpen(false));
    $$("a", menu).forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
      if (e.key === "Tab" && menu.classList.contains("is-open")) {
        const focusable = $$('a,button', menu).filter(el => !el.hidden);
        if (e.shiftKey && document.activeElement === focusable[0]) { e.preventDefault(); focusable.at(-1).focus(); }
        else if (!e.shiftKey && document.activeElement === focusable.at(-1)) { e.preventDefault(); focusable[0].focus(); }
      }
    });
    const current = location.pathname.split("/").pop() || "index.html";
    $$("[data-nav]").forEach(a => {
      if (a.getAttribute("href") === current) { a.setAttribute("aria-current", "page"); a.classList.add("active"); }
    });
  }

  function setupFAQ() {
    $$(".faq-question").forEach(button => button.addEventListener("click", () => {
      const item = button.closest(".faq-item"), panel = $(".faq-answer", item);
      const open = button.getAttribute("aria-expanded") === "true";
      $$(".faq-item").forEach(other => {
        $(".faq-question", other)?.setAttribute("aria-expanded", "false");
        const p = $(".faq-answer", other); if (p) p.hidden = true;
      });
      button.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    }));
  }

  function setupGallery() {
    const items = $$("[data-lightbox]");
    const box = $("#lightbox");
    if (!items.length || !box) return;
    const img = $(".lightbox-image", box), caption = $(".lightbox-caption", box);
    let index = 0, previousFocus = null;
    const show = i => {
      index = (i + items.length) % items.length;
      const source = items[index].querySelector("img");
      img.src = source.src; img.alt = source.alt; caption.textContent = source.dataset.caption || source.alt;
    };
    const open = i => { previousFocus = document.activeElement; show(i); box.hidden = false; document.body.classList.add("lightbox-open"); $(".lightbox-close", box).focus(); };
    const close = () => { box.hidden = true; document.body.classList.remove("lightbox-open"); previousFocus?.focus(); };
    items.forEach((item, i) => item.addEventListener("click", () => open(i)));
    $(".lightbox-close", box)?.addEventListener("click", close);
    $(".lightbox-prev", box)?.addEventListener("click", () => show(index - 1));
    $(".lightbox-next", box)?.addEventListener("click", () => show(index + 1));
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  function setupContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("#form-status");
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;
      $$("[required]", form).forEach(field => {
        const error = $(`[data-error-for="${field.name}"]`, form);
        let message = "";
        if (!field.value.trim()) message = "This field is required.";
        else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = "Enter a valid email address.";
        else if (field.name === "phone" && field.value.trim().length < 7) message = "Enter a valid phone number.";
        field.setAttribute("aria-invalid", String(Boolean(message)));
        if (error) error.textContent = message;
        if (message) valid = false;
      });
      if (!valid) { status.textContent = "Please review the highlighted fields."; status.className = "form-status error"; form.querySelector('[aria-invalid="true"]')?.focus(); return; }
      const data = new FormData(form);
      const subject = encodeURIComponent(`Website inquiry: ${data.get("subject")}`);
      const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`);
      status.textContent = "Your email app will open with your message prepared. Please send it there to complete your inquiry.";
      status.className = "form-status success";
      window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    });
    $$("input,textarea,select", form).forEach(field => field.addEventListener("input", () => {
      field.setAttribute("aria-invalid", "false");
      const error = $(`[data-error-for="${field.name}"]`, form); if (error) error.textContent = "";
    }));
  }

  function setupReveal() {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $$(".reveal").forEach(el => el.classList.add("is-visible")); return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    $$(".reveal").forEach(el => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyConfig(); setupMenu(); setupFAQ(); setupGallery(); setupContactForm(); setupReveal();
    const top = $(".to-top");
    window.addEventListener("scroll", () => top?.classList.toggle("shown", window.scrollY > 500), { passive: true });
    top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  });
})();
