// Scholarship Directory page

const searchInput = document.getElementById("search");
const levelSelect = document.getElementById("level");
const countrySelect = document.getElementById("country");
const sortSelect = document.getElementById("sort");
const list = document.getElementById("list");
const count = document.getElementById("count");
const activeFilters = document.getElementById("activeFilters");

// Fill country dropdown from the data
[...new Set(scholarships.map(s => s.country))].sort().forEach(function (c) {
  const option = document.createElement("option");
  option.textContent = c;
  countrySelect.appendChild(option);
});

// Pick up a search term (from the home page) or a level (from the footer links)
const params = new URLSearchParams(window.location.search);
if (params.get("search")) searchInput.value = params.get("search");
if (params.get("level")) levelSelect.value = params.get("level");

function resetFilters() {
  searchInput.value = "";
  levelSelect.value = "";
  countrySelect.value = "";
  sortSelect.value = "deadline";
  render();
  searchInput.focus();
}

function renderActiveFilters(q, level, country) {
  const chips = [];
  if (q) chips.push({ key: "search", label: '"' + q + '"' });
  if (level) chips.push({ key: "level", label: level });
  if (country) chips.push({ key: "country", label: country });

  activeFilters.innerHTML = chips.map(c =>
    `<button type="button" class="filter-chip" data-clear="${c.key}" aria-label="Remove filter ${escapeHtml(c.label)}">${escapeHtml(c.label)}${icon("x")}</button>`
  ).join("");
}

activeFilters.addEventListener("click", function (e) {
  const chip = e.target.closest("[data-clear]");
  if (!chip) return;
  const key = chip.getAttribute("data-clear");
  if (key === "search") searchInput.value = "";
  if (key === "level") levelSelect.value = "";
  if (key === "country") countrySelect.value = "";
  render();
});

function render() {
  const rawQuery = searchInput.value.trim();
  const q = rawQuery.toLowerCase();
  const level = levelSelect.value;
  const country = countrySelect.value;

  let result = scholarships.filter(function (s) {
    const text = (s.name + " " + s.provider + " " + s.country + " " + s.level + " " + s.type).toLowerCase();
    return (!q || text.includes(q))
      && (!level || s.level === level)
      && (!country || s.country === country);
  });

  if (sortSelect.value === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    result.sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline));
  }

  count.innerHTML = `Showing <strong>${result.length}</strong> of ${scholarships.length} scholarships`;
  renderActiveFilters(rawQuery, level, country);

  list.innerHTML = result.length
    ? result.map((s, i) => scholarshipCard(s, null, i)).join("")
    : `<div class="empty">
         <div class="empty-ico">${icon("search")}</div>
         <h3>No scholarships found</h3>
         <p>No scholarships match your search. Try changing the filters.</p>
         <button type="button" class="btn btn-outline" id="emptyReset">${icon("refresh")}Clear all filters</button>
       </div>`;

  const emptyReset = document.getElementById("emptyReset");
  if (emptyReset) emptyReset.addEventListener("click", resetFilters);
  revealIn(list);
}

searchInput.addEventListener("input", render);
levelSelect.addEventListener("change", render);
countrySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);
document.getElementById("resetFilters").addEventListener("click", resetFilters);

render();
