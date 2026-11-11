// Shared UI code used by every page: icons, scholarship cards,
// the mobile menu, the sticky header and the scroll-in animations.

// ---------- Icons (inline SVG, drawn with strokes) ----------
const ICONS = {
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/><path d="M10 21v-4h4v4"/>',
  wallet: '<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M16 12.5h.01"/><path d="M2 10h20"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  listChecks: '<path d="m3 7 2 2 4-4M3 17l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  map: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'
};

function icon(name, extraClass) {
  return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    + 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
    + (ICONS[name] || "") + "</svg>";
}

// Replaces <span data-icon="name"></span> placeholders in the HTML with SVG icons
function renderIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = icon(el.getAttribute("data-icon"), el.getAttribute("data-icon-class"));
    el.removeAttribute("data-icon");
  });
}

// Makes text safe to insert into HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Deadline helpers ----------
function deadlineBadge(dateStr) {
  const days = daysLeft(dateStr);
  if (days < 0) return '<span class="badge closed">Closed</span>';
  if (days === 0) return '<span class="badge soon">Closes today</span>';
  if (days <= 30) return '<span class="badge soon">' + days + (days === 1 ? " day" : " days") + " left</span>";
  return '<span class="badge open">Open</span>';
}

function deadlineNote(dateStr) {
  const days = daysLeft(dateStr);
  if (days < 0) return "closed";
  if (days === 0) return "closes today";
  return "in " + days + (days === 1 ? " day" : " days");
}

// ---------- Scholarship card ----------
// note (optional): { type: "yes" | "near", text: "..." }
function scholarshipCard(s, note, index) {
  const noteHtml = note
    ? '<p class="match-note ' + note.type + '">' + icon(note.type === "yes" ? "checkCircle" : "alert") + escapeHtml(note.text) + "</p>"
    : "";
  return '' +
    '<article class="card reveal" style="--d:' + ((index || 0) % 6) + '">' +
      '<div class="card-top">' +
        '<span class="chip">' + icon("cap") + escapeHtml(s.level) + "</span>" +
        deadlineBadge(s.deadline) +
      "</div>" +
      noteHtml +
      '<h3><a href="details.html?id=' + s.id + '">' + escapeHtml(s.name) + "</a></h3>" +
      '<p class="provider">' + icon("building") + escapeHtml(s.provider) + "</p>" +
      '<div class="card-meta">' +
        '<div class="meta-item amount"><span class="ico">' + icon("wallet") + "</span>" + escapeHtml(s.amount) + "</div>" +
        '<div class="meta-item"><span class="ico">' + icon("globe") + "</span>" + escapeHtml(s.country) + "</div>" +
        '<div class="meta-item"><span class="ico">' + icon("calendar") + "</span>" +
          formatDate(s.deadline) + "&nbsp;<small>(" + deadlineNote(s.deadline) + ")</small></div>" +
      "</div>" +
      '<div class="card-foot">' +
        '<span class="type">' + escapeHtml(s.type) + "</span>" +
        '<span class="link-arrow" aria-hidden="true">View details' + icon("arrowRight") + "</span>" +
      "</div>" +
    "</article>";
}

// ---------- Scroll-in animations ----------
let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
}

// Call this after adding new .reveal elements to the page
function revealIn(root) {
  (root || document).querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  });
}

// ---------- Header, mobile menu and footer (runs on every page) ----------
(function () {
  renderIcons();
  revealIn();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("show");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("show") && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  if (header) {
    const onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
