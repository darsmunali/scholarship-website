// Application Guide page

// Accordion – open one step at a time
const steps = document.querySelectorAll(".step");

function setOpen(step, open) {
  step.classList.toggle("open", open);
  step.querySelector(".step-head").setAttribute("aria-expanded", open ? "true" : "false");
}

steps.forEach(function (step) {
  step.querySelector(".step-head").addEventListener("click", function () {
    const wasOpen = step.classList.contains("open");
    steps.forEach(s => setOpen(s, false));
    if (!wasOpen) setOpen(step, true);
  });
});

// Document checklist with saved progress
const items = [
  "CNIC / B-Form copy",
  "Matric and Intermediate certificates",
  "Latest transcript",
  "Income certificate or salary slip",
  "Utility bills",
  "Passport-size photographs",
  "Personal statement",
  "Recommendation letters",
  "Admission or enrollment letter",
  "Domicile certificate"
];

const STORAGE_KEY = "scholarpath_checklist";
const box = document.getElementById("checklist");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const progressDone = document.getElementById("progressDone");

let saved = [];
try {
  saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
} catch (e) {
  saved = [];
}

items.forEach(function (item, i) {
  const label = document.createElement("label");
  label.className = "check-item";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = saved.includes(i);
  const tick = document.createElement("span");
  tick.className = "check-box";
  tick.innerHTML = icon("check");
  const span = document.createElement("span");
  span.className = "text";
  span.textContent = item;
  label.appendChild(checkbox);
  label.appendChild(tick);
  label.appendChild(span);
  if (checkbox.checked) label.classList.add("done");

  checkbox.addEventListener("change", function () {
    label.classList.toggle("done", checkbox.checked);
    updateProgress();
  });
  box.appendChild(label);
});

function updateProgress() {
  const boxes = box.querySelectorAll("input[type=checkbox]");
  const checked = [];
  boxes.forEach((b, i) => { if (b.checked) checked.push(i); });

  const percent = Math.round(checked.length / items.length * 100);
  progressText.textContent = `${checked.length} of ${items.length} completed`;
  progressPercent.textContent = percent + "%";
  progressBar.style.width = percent + "%";
  progress.setAttribute("aria-valuenow", percent);
  progressDone.classList.toggle("show", checked.length === items.length);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  } catch (e) {
    // storage not available – checklist still works for this visit
  }
}

document.getElementById("resetChecklist").addEventListener("click", function () {
  box.querySelectorAll("input[type=checkbox]").forEach(function (b) {
    b.checked = false;
    b.parentElement.classList.remove("done");
  });
  updateProgress();
});

updateProgress();
