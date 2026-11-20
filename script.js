const runForm = document.getElementById("run-form");
const runDateInput = document.getElementById("run-date");
const runTimeInput = document.getElementById("run-time");
const distanceInput = document.getElementById("run-distance");
const painInput = document.getElementById("pain-level");
const painIndicator = document.getElementById("pain-indicator");
const currentWeekTotal = document.getElementById("current-week-total");
const weeklySummary = document.getElementById("weekly-summary");
const runList = document.getElementById("run-list");

const runs = [];

// Returns the color category for a pain score.
function getPainCategory(painLevel) {
  if (painLevel <= 3) {
    return { label: "Grün", color: "green" };
  }
  if (painLevel <= 6) {
    return { label: "Gelb", color: "yellow" };
  }
  return { label: "Rot", color: "red" };
}

// Updates the color preview when the pain score changes.
function updatePainIndicator() {
  const painLevel = Number(painInput.value);

  if (painInput.value === "" || painLevel < 1 || painLevel > 10 || !Number.isInteger(painLevel)) {
    painIndicator.className = "pain-indicator neutral";
    painIndicator.textContent = "Schmerzfarbe wird nach Eingabe angezeigt.";
    return;
  }

  const category = getPainCategory(painLevel);
  painIndicator.className = "pain-indicator " + category.color;
  painIndicator.textContent = painLevel + "/10 – " + category.label;
}

// Returns today's date in the format needed by a date input.
function getCurrentDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// Fills the date and time inputs with the current local time.
function setCurrentDateAndTime() {
  const now = new Date();
  runDateInput.value = getCurrentDateValue();
  runTimeInput.value = String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0");
}

// Returns the Monday date for the week of a given date.
function getWeekStart(dateValue) {
  const dateParts = dateValue.split("-");
  const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") +
    "-" + String(date.getDate()).padStart(2, "0");
}

// Formats a date value as day, month, and year.
function formatDate(dateValue) {
  const dateParts = dateValue.split("-");
  return dateParts[2] + "." + dateParts[1] + "." + dateParts[0];
}

// Formats a distance using German decimal notation.
function formatKilometers(kilometers) {
  return kilometers.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

// Saves all runs in the browser.
function saveRuns() {
  localStorage.setItem("runs", JSON.stringify(runs));
}

// Loads saved runs and refreshes the page sections.
function loadRuns() {
  const savedRuns = localStorage.getItem("runs");

  if (savedRuns !== null) {
    const parsedRuns = JSON.parse(savedRuns);
    for (const run of parsedRuns) {
      runs.push(run);
    }
  }

  showRunHistory();
  showWeeklySummary();
}

// Creates one history item for a run.
function createRunItem(run) {
  const listItem = document.createElement("li");
  const runDetails = document.createElement("span");
  const category = getPainCategory(run.pain);
  const painBadge = document.createElement("span");

  runDetails.className = "run-details";
  runDetails.textContent = formatDate(run.date) + " um " + run.time + " · " +
    formatKilometers(run.kilometers) + " km";
  painBadge.className = "pain-badge " + category.color;
  painBadge.textContent = "Schmerzen: " + run.pain + "/10 (" + category.label + ")";
  listItem.appendChild(runDetails);
  listItem.appendChild(painBadge);
  return listItem;
}

// Shows saved runs with the most recently added run first.
function showRunHistory() {
  runList.textContent = "";

  if (runs.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Noch keine Läufe eingetragen.";
    runList.appendChild(emptyMessage);
    return;
  }

  for (let index = runs.length - 1; index >= 0; index--) {
    runList.appendChild(createRunItem(runs[index]));
  }
}

// Adds each run's distance to its calendar week.
function calculateWeeklyTotals() {
  const totals = {};

  for (const run of runs) {
    const weekStart = getWeekStart(run.date);
    if (totals[weekStart] === undefined) {
      totals[weekStart] = 0;
    }
    totals[weekStart] += run.kilometers;
  }

  return totals;
}

// Shows this week's total and totals for all weeks with runs.
function showWeeklySummary() {
  const totals = calculateWeeklyTotals();
  const thisWeek = getWeekStart(getCurrentDateValue());
  const weekStarts = Object.keys(totals).sort();
  currentWeekTotal.textContent = "Diese Woche: " +
    formatKilometers(totals[thisWeek] || 0) + " km";
  weeklySummary.textContent = "";

  if (weekStarts.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Noch keine Wochenkilometer vorhanden.";
    weeklySummary.appendChild(emptyMessage);
    return;
  }

  for (let index = weekStarts.length - 1; index >= 0; index--) {
    const listItem = document.createElement("li");
    listItem.textContent = "Woche ab " + formatDate(weekStarts[index]) + ": " +
      formatKilometers(totals[weekStarts[index]]) + " km";
    weeklySummary.appendChild(listItem);
  }
}

// Adds a valid run to the history and saves it.
function addRun(event) {
  event.preventDefault();

  if (!runForm.checkValidity()) {
    runForm.reportValidity();
    return;
  }

  runs.push({
    date: runDateInput.value,
    time: runTimeInput.value,
    kilometers: Number(distanceInput.value),
    pain: Number(painInput.value)
  });

  saveRuns();
  showRunHistory();
  showWeeklySummary();
  runForm.reset();
  setCurrentDateAndTime();
  updatePainIndicator();
}

runForm.addEventListener("submit", addRun);
painInput.addEventListener("input", updatePainIndicator);
setCurrentDateAndTime();
updatePainIndicator();
loadRuns();