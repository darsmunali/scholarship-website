// Scholarship Details page – reads ?id= from the URL

const id = parseInt(new URLSearchParams(window.location.search).get("id"));
const s = scholarships.find(item => item.id === id);
const content = document.getElementById("content");

if (!s) {
  document.getElementById("title").textContent = "Scholarship Not Found";
  document.getElementById("crumb").textContent = "Not found";
  content.innerHTML = `
    <div class="empty">
      <div class="empty-ico">${icon("search")}</div>
      <h3>We could not find this scholarship</h3>
      <p>Please go back to the directory and choose one from the list.</p>
      <a href="directory.html" class="btn btn-primary">Browse scholarships ${icon("arrowRight", "icon-arrow")}</a>
    </div>`;
} else {
  document.title = "ScholarPath – " + s.name;
  document.getElementById("title").textContent = s.name;
  document.getElementById("crumb").textContent = s.name;
  document.getElementById("subtitle").textContent = s.provider;
  document.getElementById("headerTags").innerHTML =
    `<span class="chip">${icon("cap")}${escapeHtml(s.level)}</span>` +
    `<span class="chip">${icon("globe")}${escapeHtml(s.country)}</span>` +
    `<span class="chip">${icon("award")}${escapeHtml(s.type)}</span>` +
    deadlineBadge(s.deadline);

  const days = daysLeft(s.deadline);
  const closed = days < 0;
  const deadlineText = closed ? "Applications closed" : days + " days remaining";
  // countdown bar: full when 180+ days remain, empty on the deadline
  const barWidth = closed ? 0 : Math.max(4, Math.min(100, Math.round(days / 180 * 100)));

  // Related: same level or same country, excluding this one
  const related = scholarships
    .filter(x => x.id !== s.id && (x.level === s.level || x.country === s.country))
    .slice(0, 3);

  const fact = (ico, label, value) =>
    `<div class="fact"><span class="ico">${icon(ico)}</span><span class="fact-label">${label}</span><span class="fact-value">${escapeHtml(value)}</span></div>`;

  const websiteButton = s.website && s.website !== "#"
    ? `<a href="${escapeHtml(s.website)}" target="_blank" rel="noopener" class="btn btn-primary btn-block">Visit Official Website ${icon("external")}</a>`
    : `<span class="btn btn-outline btn-block" aria-disabled="true" style="cursor:default; opacity:.7">Official website not available</span>`;

  content.innerHTML = `
    <div class="details-layout">
      <div>
        <div class="panel reveal">
          <h2 class="panel-title"><span class="ico">${icon("info")}</span>About this Scholarship</h2>
          <p>${escapeHtml(s.description)}</p>
        </div>
        <div class="panel reveal">
          <h2 class="panel-title"><span class="ico">${icon("checkCircle")}</span>Eligibility Criteria</h2>
          <ul class="check-list">${s.eligibility.map(e => `<li><span class="ico">${icon("check")}</span>${escapeHtml(e)}</li>`).join("")}</ul>
        </div>
        <div class="panel reveal">
          <h2 class="panel-title"><span class="ico">${icon("folder")}</span>Required Documents</h2>
          <div class="doc-grid">${s.documents.map(d => `<div class="doc"><span class="ico">${icon("file")}</span>${escapeHtml(d)}</div>`).join("")}</div>
        </div>
      </div>
      <aside class="panel facts reveal" aria-label="Quick facts">
        <div class="facts-head">
          <div class="label">${closed ? "Status" : "Time left to apply"}</div>
          <div class="big">${closed ? "Closed" : days + " <small>" + (days === 1 ? "day" : "days") + "</small>"}</div>
          <div class="when">Deadline: ${formatDate(s.deadline)}</div>
          <div class="countdown-bar"><span style="width:${barWidth}%"></span></div>
        </div>
        <div class="facts-body">
          <h2 class="panel-title" style="margin:10px 0 4px; font-size:1.05rem">Quick Facts</h2>
          ${fact("globe", "Country", s.country)}
          ${fact("cap", "Level", s.level)}
          ${fact("award", "Type", s.type)}
          ${fact("book", "Field", s.field)}
          ${fact("wallet", "Funding", s.amount)}
          ${fact("star", "Minimum CGPA", s.minGpa.toFixed(1))}
          ${fact("calendar", "Deadline", formatDate(s.deadline))}
          ${fact("clock", "Status", deadlineText)}
          <div class="facts-actions">
            ${websiteButton}
            <a href="eligibility.html" class="btn btn-outline btn-block">${icon("target")}Check My Eligibility</a>
          </div>
          <p class="facts-note">Always confirm details on the official website.</p>
        </div>
      </aside>
    </div>
    ${related.length ? `
      <div class="section-head left reveal" style="margin:64px 0 24px">
        <span class="kicker">You may also like</span>
        <h2>Similar Scholarships</h2>
      </div>
      <div class="card-grid">${related.map((r, i) => scholarshipCard(r, null, i)).join("")}</div>` : ""}
  `;
  revealIn(content);
}
