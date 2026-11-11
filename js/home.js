// Home page

// Animated counter for the stats (starts when the stats come into view)
function countUp(id, target) {
  const el = document.getElementById(id);
  if (target === 0) { el.textContent = 0; return; }
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countries = new Set(scholarships.map(s => s.country));
const openList = scholarships.filter(s => daysLeft(s.deadline) >= 0);
const fundedCount = scholarships.filter(s => s.amount.toLowerCase().includes("fully funded")).length;

function startCounters() {
  countUp("statTotal", scholarships.length);
  countUp("statCountries", countries.size);
  countUp("statOpen", openList.length);
  countUp("statFunded", fundedCount);
}

const statsBox = document.querySelector(".stats");
if ("IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      startCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsBox);
} else {
  startCounters();
}

// Three open scholarships with the nearest deadlines
const upcoming = openList
  .slice()
  .sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline))
  .slice(0, 3);

const upcomingBox = document.getElementById("upcoming");
upcomingBox.innerHTML = upcoming.length
  ? upcoming.map((s, i) => scholarshipCard(s, null, i)).join("")
  : '<p class="empty">No upcoming deadlines.</p>';
revealIn(upcomingBox);

// Hero card shows a real fully funded scholarship that is still open
const featured = openList
  .filter(s => s.amount.toLowerCase().includes("fully funded"))
  .sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline))[0];
if (featured) {
  document.getElementById("hvTitle").textContent = featured.name;
  document.getElementById("hvProvider").textContent = featured.provider;
  document.getElementById("hvLevel").textContent = featured.level;
  document.getElementById("hvCountry").textContent = featured.country;
  document.getElementById("hvAmount").textContent = "Fully funded";
  document.getElementById("hvDeadline").textContent = formatDate(featured.deadline);
}
if (upcoming.length) {
  const d = daysLeft(upcoming[0].deadline);
  document.getElementById("hvSoon").textContent = d === 0 ? "Closes today" : d + (d === 1 ? " day left" : " days left");
}

// Hero search sends the keyword to the directory page
document.getElementById("heroSearch").addEventListener("submit", function (e) {
  e.preventDefault();
  const q = document.getElementById("heroInput").value.trim();
  window.location.href = "directory.html" + (q ? "?search=" + encodeURIComponent(q) : "");
});
