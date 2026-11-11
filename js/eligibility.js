// Eligibility Checker page

const form = document.getElementById("eligibilityForm");
const results = document.getElementById("results");
const formAlert = document.getElementById("formAlert");
const REQUIRED = ["name", "level", "gpa", "income"];
let submittedOnce = false;

function readForm() {
  return {
    name: document.getElementById("name").value.trim(),
    level: document.getElementById("level").value,
    gpa: parseFloat(document.getElementById("gpa").value),
    income: parseFloat(document.getElementById("income").value),
    field: document.getElementById("field").value,
    gender: document.getElementById("gender").value,
    where: document.getElementById("where").value
  };
}

// Shows a field as valid (message = "") or invalid (message = the error)
function setState(id, message) {
  const group = document.querySelector(`[data-field="${id}"]`);
  const input = document.getElementById(id);
  document.getElementById(id + "Error").innerHTML = message ? icon("alert") + escapeHtml(message) : "";
  group.classList.toggle("is-invalid", !!message);
  group.classList.toggle("is-valid", !message);
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function clearStates() {
  REQUIRED.forEach(function (id) {
    const group = document.querySelector(`[data-field="${id}"]`);
    group.classList.remove("is-invalid", "is-valid");
    document.getElementById(id).removeAttribute("aria-invalid");
    document.getElementById(id + "Error").innerHTML = "";
  });
  formAlert.classList.remove("show");
}

// Returns the error message for one field, or "" if it is fine
function checkField(id, data) {
  if (id === "name") {
    if (data.name.length < 3) return "Please enter your full name (at least 3 characters).";
    if (!/^[\p{L} .'-]+$/u.test(data.name)) return "Please use letters and spaces only.";
  }
  if (id === "level" && !data.level) return "Please select a level.";
  if (id === "gpa" && (isNaN(data.gpa) || data.gpa < 0 || data.gpa > 4)) return "Enter a CGPA between 0 and 4.";
  if (id === "income" && (isNaN(data.income) || data.income < 0)) return "Enter a valid monthly income.";
  return "";
}

function validate(data) {
  let valid = true;
  REQUIRED.forEach(function (id) {
    const message = checkField(id, data);
    setState(id, message);
    if (message) valid = false;
  });
  return valid;
}

// After the first submit, fields re-check themselves as the user types
REQUIRED.forEach(function (id) {
  const input = document.getElementById(id);
  const evt = input.tagName === "SELECT" ? "change" : "input";
  input.addEventListener(evt, function () {
    if (!submittedOnce) return;
    setState(id, checkField(id, readForm()));
    if (!form.querySelector(".is-invalid")) formAlert.classList.remove("show");
  });
});

// Returns a list of reasons the student does not qualify (empty list = eligible)
function checkScholarship(s, data) {
  const reasons = [];
  if (s.level !== data.level) reasons.push("Different study level");
  if (data.gpa < s.minGpa) reasons.push(`Needs CGPA ${s.minGpa.toFixed(1)}`);
  if (s.maxIncome !== null && data.income > s.maxIncome) reasons.push("Income above limit");
  if (s.field !== "Any" && data.field !== s.field) reasons.push(`Only for ${s.field}`);
  if (s.gender && data.gender !== s.gender) reasons.push(`Only for ${s.gender} students`);
  if (data.where === "local" && s.country !== "Pakistan") reasons.push("Abroad scholarship");
  if (data.where === "abroad" && s.country === "Pakistan") reasons.push("Local scholarship");
  if (daysLeft(s.deadline) < 0) reasons.push("Deadline passed");
  return reasons;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  submittedOnce = true;
  const data = readForm();

  if (!validate(data)) {
    results.innerHTML = "";
    formAlert.classList.remove("show");
    void formAlert.offsetWidth; // restart the shake animation
    formAlert.classList.add("show");
    const firstBad = form.querySelector(".is-invalid input, .is-invalid select");
    if (firstBad) firstBad.focus();
    return;
  }
  formAlert.classList.remove("show");

  const eligible = [];
  const nearMiss = [];

  scholarships.forEach(function (s) {
    const reasons = checkScholarship(s, data);
    if (reasons.length === 0) eligible.push(s);
    else if (reasons.length === 1 && s.level === data.level) nearMiss.push({ s, reason: reasons[0] });
  });

  const atLevel = scholarships.filter(s => s.level === data.level).length;
  const percent = atLevel ? Math.round(eligible.length / atLevel * 100) : 0;
  const whereText = { any: "Anywhere", local: "Pakistan only", abroad: "Abroad only" }[data.where];

  let html = `
    <div class="results-summary reveal">
      <div>
        <h2>Results for ${escapeHtml(data.name)}</h2>
        <p>You are eligible for <strong>${eligible.length}</strong> scholarship${eligible.length === 1 ? "" : "s"}${nearMiss.length ? ` and almost eligible for ${nearMiss.length} more` : ""}.</p>
        <div class="profile-chips">
          <span>${escapeHtml(data.level)}</span>
          <span>CGPA ${data.gpa.toFixed(2)}</span>
          <span>Rs. ${Math.round(data.income).toLocaleString("en-PK")} / month</span>
          <span>${data.field === "Any" ? "Any field" : escapeHtml(data.field)}</span>
          <span>${whereText}</span>
        </div>
      </div>
      <div class="score-ring" style="--p:${percent}" aria-label="${eligible.length} of ${atLevel} ${escapeHtml(data.level)} scholarships matched">
        <div><span><strong>${eligible.length}/${atLevel}</strong><small>at your level</small></span></div>
      </div>
    </div>`;

  html += `<div class="results-group">
    <h3>${icon("checkCircle")}Eligible <span class="count">${eligible.length}</span></h3>`;
  if (eligible.length) {
    html += `<p>You meet every listed requirement for these scholarships.</p>
      <div class="card-grid">${eligible.map((s, i) =>
        scholarshipCard(s, { type: "yes", text: "You meet the criteria" }, i)).join("")}</div>`;
  } else {
    html += `<div class="empty">
      <div class="empty-ico">${icon("search")}</div>
      <h3>No exact matches right now</h3>
      <p>Try the <a href="directory.html">full directory</a> or improve your profile using the <a href="guide.html">application guide</a>.</p>
    </div>`;
  }
  html += `</div>`;

  if (nearMiss.length) {
    html += `<div class="results-group near">
      <h3>${icon("alert")}Almost Eligible <span class="count">${nearMiss.length}</span></h3>
      <p>You meet all criteria except one</p>
      <div class="card-grid">${nearMiss.map((n, i) =>
        scholarshipCard(n.s, { type: "near", text: "Not met: " + n.reason }, i)).join("")}</div>
    </div>`;
  }

  results.innerHTML = html;
  revealIn(results);
  results.scrollIntoView({ behavior: "smooth", block: "start" });
  results.focus({ preventScroll: true });
});

form.addEventListener("reset", function () {
  submittedOnce = false;
  results.innerHTML = "";
  clearStates();
});
