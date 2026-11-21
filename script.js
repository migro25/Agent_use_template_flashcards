const runForm = document.getElementById("run-form");
const runDateInput = document.getElementById("run-date");
const runTimeInput = document.getElementById("run-time");
const distanceInput = document.getElementById("run-distance");
const painInput = document.getElementById("pain-level");
const noteInput = document.getElementById("run-note");
const painIndicator = document.getElementById("pain-indicator");
const statCurrentWeek = document.getElementById("stat-current-week");
const statRunCount = document.getElementById("stat-run-count");
const statAveragePain = document.getElementById("stat-average-pain");
const statAveragePainLabel = document.getElementById("stat-average-pain-label");
const statLongestRun = document.getElementById("stat-longest-run");
const weeklySummary = document.getElementById("weekly-summary");
const runList = document.getElementById("run-list");
const weeklyChart = document.getElementById("weekly-chart");
const painChart = document.getElementById("pain-chart");
const exportButton = document.getElementById("export-button");
const importInput = document.getElementById("import-input");

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

// Turns a date value like "2026-11-21" into a local Date object.
function parseDateValue(dateValue) {
  const dateParts = dateValue.split("-");
  return new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
}

// Turns a Date object into a date value like "2026-11-21".
function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// Returns today's date in the format needed by a date input.
function getCurrentDateValue() {
  return toDateValue(new Date());
}

// Fills the date and time inputs with the current local time.
// Dates after today cannot be chosen.
function setCurrentDateAndTime() {
  const now = new Date();
  runDateInput.value = getCurrentDateValue();
  runDateInput.max = getCurrentDateValue();
  runTimeInput.value = String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0");
}

// Returns the Monday date for the week of a given date.
function getWeekStart(dateValue) {
  const date = parseDateValue(dateValue);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return toDateValue(date);
}

// Returns the Monday one week after the given Monday.
function getNextWeekStart(weekStart) {
  const date = parseDateValue(weekStart);
  date.setDate(date.getDate() + 7);
  return toDateValue(date);
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

// Formats a number with at most one decimal place in German notation.
function formatOneDecimal(number) {
  return number.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
}

// Saves all runs in the browser.
function saveRuns() {
  localStorage.setItem("runs", JSON.stringify(runs));
}

// Sorts all runs by date and time, oldest run first.
function sortRuns() {
  runs.sort(function (firstRun, secondRun) {
    const firstKey = firstRun.date + " " + firstRun.time;
    const secondKey = secondRun.date + " " + secondRun.time;
    return firstKey.localeCompare(secondKey);
  });
}

// Refreshes the key figures, run list, weekly summary and charts.
function showAllSections() {
  showStats();
  showRunHistory();
  showWeeklySummary();
  showCharts();
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

  sortRuns();
  showAllSections();
}

// Asks for confirmation, then removes one run and saves the change.
function deleteRun(runIndex) {
  const run = runs[runIndex];
  const question = "Lauf vom " + formatDate(run.date) + " um " + run.time +
    " (" + formatKilometers(run.kilometers) + " km) wirklich löschen?";

  if (!confirm(question)) {
    return;
  }

  runs.splice(runIndex, 1);
  saveRuns();
  showAllSections();
}

// Creates the delete button for the run at the given position.
// The aria-label tells screen reader users which run will be deleted.
function createDeleteButton(runIndex) {
  const run = runs[runIndex];
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Löschen";
  deleteButton.setAttribute("aria-label", "Lauf vom " + formatDate(run.date) +
    " um " + run.time + " löschen");
  deleteButton.addEventListener("click", function () {
    deleteRun(runIndex);
  });
  return deleteButton;
}

// Creates the date, distance and (if present) note text for a run.
function createRunDetails(run) {
  const runDetails = document.createElement("span");
  runDetails.className = "run-details";
  runDetails.textContent = formatDate(run.date) + " um " + run.time + " · " +
    formatKilometers(run.kilometers) + " km";

  if (run.note) {
    const noteText = document.createElement("span");
    noteText.className = "run-note";
    noteText.textContent = "Notiz: " + run.note;
    runDetails.appendChild(noteText);
  }

  return runDetails;
}

// Creates one history item for a run.
function createRunItem(run, runIndex) {
  const listItem = document.createElement("li");
  const category = getPainCategory(run.pain);
  const painBadge = document.createElement("span");
  const itemActions = document.createElement("span");

  painBadge.className = "pain-badge " + category.color;
  painBadge.textContent = "Schmerzen: " + run.pain + "/10 (" + category.label + ")";
  itemActions.className = "run-actions";
  itemActions.appendChild(painBadge);
  itemActions.appendChild(createDeleteButton(runIndex));
  listItem.appendChild(createRunDetails(run));
  listItem.appendChild(itemActions);
  return listItem;
}

// Shows saved runs with the newest run (by date and time) first.
function showRunHistory() {
  runList.textContent = "";

  if (runs.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Noch keine Läufe eingetragen.";
    runList.appendChild(emptyMessage);
    return;
  }

  for (let index = runs.length - 1; index >= 0; index--) {
    runList.appendChild(createRunItem(runs[index], index));
  }
}

// Collects kilometers, pain sum and number of runs for each calendar week.
function calculateWeeklyStats() {
  const stats = {};

  for (const run of runs) {
    const weekStart = getWeekStart(run.date);
    if (stats[weekStart] === undefined) {
      stats[weekStart] = { kilometers: 0, painSum: 0, runCount: 0 };
    }
    stats[weekStart].kilometers += run.kilometers;
    stats[weekStart].painSum += run.pain;
    stats[weekStart].runCount += 1;
  }

  return stats;
}

// Returns every week from the first run until this week, also weeks without runs.
function getAllWeekStarts(stats) {
  const thisWeek = getWeekStart(getCurrentDateValue());
  const weeksWithRuns = Object.keys(stats).sort();
  const weekStarts = [];
  let weekStart = thisWeek;
  let lastWeek = thisWeek;

  if (weeksWithRuns.length > 0 && weeksWithRuns[0] < weekStart) {
    weekStart = weeksWithRuns[0];
  }
  if (weeksWithRuns.length > 0 && weeksWithRuns[weeksWithRuns.length - 1] > lastWeek) {
    lastWeek = weeksWithRuns[weeksWithRuns.length - 1];
  }

  while (weekStart <= lastWeek) {
    weekStarts.push(weekStart);
    weekStart = getNextWeekStart(weekStart);
  }
  return weekStarts;
}

// Returns the kilometers of a week, or 0 if there was no run.
function getWeekKilometers(stats, weekStart) {
  if (stats[weekStart] === undefined) {
    return 0;
  }
  return stats[weekStart].kilometers;
}

// Describes the change in kilometers compared to the week before.
function describeWeekChange(currentKilometers, previousKilometers) {
  if (previousKilometers === 0) {
    return "";
  }

  const change = Math.round((currentKilometers - previousKilometers) / previousKilometers * 100);
  let sign = "";
  if (change > 0) {
    sign = "+";
  }
  return sign + change + " % zur Vorwoche";
}

// Creates a colored badge with the average pain of a week.
function createAveragePainBadge(weekStats) {
  const averagePain = weekStats.painSum / weekStats.runCount;
  const category = getPainCategory(Math.round(averagePain));
  const badge = document.createElement("span");
  badge.className = "pain-badge " + category.color;
  badge.textContent = "Ø Schmerz " + formatOneDecimal(averagePain) + "/10 (" + category.label + ")";
  return badge;
}

// Returns the short status text for a week: running, no run, or change to last week.
function getWeekStatusText(weekStart, stats, previousKilometers) {
  // The current week is not finished yet, so comparing it would be misleading.
  if (weekStart === getWeekStart(getCurrentDateValue())) {
    return "Woche läuft noch";
  }
  if (stats[weekStart] === undefined) {
    return "kein Lauf";
  }
  return describeWeekChange(stats[weekStart].kilometers, previousKilometers);
}

// Creates the kilometers, status and average pain text for one week.
function createWeekInfo(weekStart, stats, previousKilometers) {
  const weekInfo = document.createElement("span");
  const statusText = getWeekStatusText(weekStart, stats, previousKilometers);
  weekInfo.className = "week-info";
  weekInfo.textContent = formatKilometers(getWeekKilometers(stats, weekStart)) + " km";

  if (statusText !== "") {
    weekInfo.textContent += " · " + statusText;
  }
  if (stats[weekStart] !== undefined) {
    weekInfo.appendChild(createAveragePainBadge(stats[weekStart]));
  }
  return weekInfo;
}

// Creates one list item for a calendar week.
function createWeekItem(weekStart, stats, previousKilometers) {
  const listItem = document.createElement("li");
  const weekLabel = document.createElement("span");

  if (stats[weekStart] === undefined) {
    listItem.className = "empty-week";
  }
  weekLabel.textContent = "Woche ab " + formatDate(weekStart);
  listItem.appendChild(weekLabel);
  listItem.appendChild(createWeekInfo(weekStart, stats, previousKilometers));
  return listItem;
}

// Returns the longest single run in kilometers, or 0 if there are no runs.
function getLongestRun() {
  let longestRun = 0;

  for (const run of runs) {
    if (run.kilometers > longestRun) {
      longestRun = run.kilometers;
    }
  }

  return longestRun;
}

// Returns the Monday three weeks before this week, the start of the last 4 weeks.
function getFourWeeksStart() {
  const date = parseDateValue(getWeekStart(getCurrentDateValue()));
  date.setDate(date.getDate() - 21);
  return toDateValue(date);
}

// Returns the average pain of the last 4 calendar weeks, or null if there were no runs.
function calculateRecentAveragePain() {
  const startDate = getFourWeeksStart();
  let painSum = 0;
  let runCount = 0;

  for (const run of runs) {
    if (run.date >= startDate) {
      painSum += run.pain;
      runCount += 1;
    }
  }

  if (runCount === 0) {
    return null;
  }
  return painSum / runCount;
}

// Shows the average pain of the last 4 calendar weeks with its color group.
function showRecentAveragePain() {
  const averagePain = calculateRecentAveragePain();

  if (averagePain === null) {
    statAveragePain.textContent = "–";
    statAveragePainLabel.className = "pain-badge neutral";
    statAveragePainLabel.textContent = "keine Läufe";
    return;
  }

  const category = getPainCategory(Math.round(averagePain));
  statAveragePain.textContent = formatOneDecimal(averagePain) + "/10";
  statAveragePainLabel.className = "pain-badge " + category.color;
  statAveragePainLabel.textContent = category.label;
}

// Fills the key figure cards at the top of the page.
function showStats() {
  const stats = calculateWeeklyStats();
  const thisWeek = getWeekStart(getCurrentDateValue());
  const longestRun = getLongestRun();

  statCurrentWeek.textContent = formatKilometers(getWeekKilometers(stats, thisWeek)) + " km";
  statRunCount.textContent = runs.length;
  statLongestRun.textContent = "–";
  if (longestRun > 0) {
    statLongestRun.textContent = formatKilometers(longestRun) + " km";
  }
  showRecentAveragePain();
}

// Shows every week since the first run, newest first.
function showWeeklySummary() {
  const stats = calculateWeeklyStats();
  weeklySummary.textContent = "";

  if (runs.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Noch keine Wochenkilometer vorhanden.";
    weeklySummary.appendChild(emptyMessage);
    return;
  }

  const weekStarts = getAllWeekStarts(stats);
  for (let index = weekStarts.length - 1; index >= 0; index--) {
    let previousKilometers = 0;
    if (index > 0) {
      previousKilometers = getWeekKilometers(stats, weekStarts[index - 1]);
    }
    weeklySummary.appendChild(createWeekItem(weekStarts[index], stats, previousKilometers));
  }
}

// Formats a date value as a short day and month, e.g. "17.11.".
function formatShortDate(dateValue) {
  const dateParts = dateValue.split("-");
  return dateParts[2] + "." + dateParts[1] + ".";
}

// Creates one column for a chart: value on top, bar in the middle, label below.
function createChartColumn(label, displayValue, percentage, color, screenReaderText) {
  const column = document.createElement("div");
  const value = document.createElement("span");
  const track = document.createElement("div");
  const bar = document.createElement("div");
  const columnLabel = document.createElement("span");

  column.className = "chart-column";
  value.className = "chart-value";
  value.textContent = displayValue;
  track.className = "chart-track";
  track.setAttribute("role", "img");
  track.setAttribute("aria-label", screenReaderText);
  bar.className = "chart-bar " + color;
  bar.style.height = percentage + "%";
  columnLabel.className = "chart-label";
  columnLabel.textContent = label;
  track.appendChild(bar);
  column.appendChild(value);
  column.appendChild(track);
  column.appendChild(columnLabel);
  return column;
}

// Creates the scale on the left of a chart: maximum at the top, half in the middle, 0 at the bottom.
// It is hidden from screen readers, because every column already has a full description.
function createChartAxis(maximumText, halfText) {
  const axis = document.createElement("div");
  const axisBox = document.createElement("div");
  const spacer = document.createElement("span");
  const axisTexts = [maximumText, halfText, "0"];
  const positions = ["axis-top", "axis-middle", "axis-bottom"];

  axis.className = "chart-axis";
  axis.setAttribute("aria-hidden", "true");
  axisBox.className = "chart-axis-box";
  for (let index = 0; index < axisTexts.length; index++) {
    const axisText = document.createElement("span");
    axisText.className = positions[index];
    axisText.textContent = axisTexts[index];
    axisBox.appendChild(axisText);
  }
  // The empty label below the scale keeps it at the same height as the columns.
  // " " is a non-breaking space; a normal space would take up no height.
  spacer.className = "chart-label";
  spacer.textContent = " ";
  axis.appendChild(axisBox);
  axis.appendChild(spacer);
  return axis;
}

// Scrolls a chart to the right end, so the newest columns are visible.
function scrollChartToNewest(chart) {
  chart.scrollLeft = chart.scrollWidth;
}

// Returns the largest weekly distance.
function getLongestWeekDistance(weekStarts, stats) {
  let longestWeek = 0;

  for (const weekStart of weekStarts) {
    if (getWeekKilometers(stats, weekStart) > longestWeek) {
      longestWeek = getWeekKilometers(stats, weekStart);
    }
  }

  return longestWeek;
}

// Creates the chart column for one week. The current week is highlighted.
function createWeekColumn(weekStart, stats, longestWeek) {
  const kilometers = getWeekKilometers(stats, weekStart);
  const value = formatKilometers(kilometers) + " km";
  let screenReaderText = "Woche ab " + formatDate(weekStart) + ": " + value;
  const isCurrentWeek = weekStart === getWeekStart(getCurrentDateValue());

  if (isCurrentWeek) {
    screenReaderText += " (diese Woche)";
  }
  const column = createChartColumn(formatShortDate(weekStart), value,
    (kilometers / longestWeek) * 100, "distance", screenReaderText);
  if (isCurrentWeek) {
    column.classList.add("current-week");
  }
  return column;
}

// Shows each week's distance as a column, oldest week on the left.
function showWeeklyChart() {
  weeklyChart.textContent = "";

  if (runs.length === 0) {
    weeklyChart.textContent = "Noch keine Wochenkilometer zum Anzeigen.";
    return;
  }

  const stats = calculateWeeklyStats();
  const weekStarts = getAllWeekStarts(stats);
  const longestWeek = getLongestWeekDistance(weekStarts, stats);
  weeklyChart.appendChild(createChartAxis(formatKilometers(longestWeek) + " km",
    formatKilometers(longestWeek / 2)));
  for (const weekStart of weekStarts) {
    weeklyChart.appendChild(createWeekColumn(weekStart, stats, longestWeek));
  }
  scrollChartToNewest(weeklyChart);
}

// Shows pain scores as columns by date and time, oldest run on the left.
function showPainChart() {
  painChart.textContent = "";

  if (runs.length === 0) {
    painChart.textContent = "Noch keine Schmerzwerte zum Anzeigen.";
    return;
  }

  painChart.appendChild(createChartAxis("10", "5"));
  for (const run of runs) {
    const category = getPainCategory(run.pain);
    const value = run.pain + "/10\n" + category.label;
    const screenReaderText = "Lauf am " + formatDate(run.date) + " um " + run.time +
      ": Schmerzen " + run.pain + "/10 (" + category.label + ")";
    painChart.appendChild(createChartColumn(formatShortDate(run.date), value,
      run.pain * 10, category.color, screenReaderText));
  }
  scrollChartToNewest(painChart);
}

// Refreshes both charts after runs change or load.
function showCharts() {
  showWeeklyChart();
  showPainChart();
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
    pain: Number(painInput.value),
    note: noteInput.value.trim()
  });

  sortRuns();
  saveRuns();
  showAllSections();
  runForm.reset();
  setCurrentDateAndTime();
  updatePainIndicator();
}

// Downloads all runs as a JSON file.
function exportRuns() {
  if (runs.length === 0) {
    alert("Es gibt noch keine Läufe zum Exportieren.");
    return;
  }

  const fileContent = JSON.stringify(runs, null, 2);
  const file = new Blob([fileContent], { type: "application/json" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = "laeufe-" + getCurrentDateValue() + ".json";
  downloadLink.click();
}

// Returns true if an imported object has all fields of a valid run.
function isValidRun(run) {
  // The patterns check the formats "2026-11-21" and "18:30".
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const timePattern = /^\d{2}:\d{2}$/;

  if (typeof run !== "object" || run === null) {
    return false;
  }
  if (typeof run.date !== "string" || !datePattern.test(run.date)) {
    return false;
  }
  if (typeof run.time !== "string" || !timePattern.test(run.time)) {
    return false;
  }
  if (typeof run.kilometers !== "number" || !(run.kilometers > 0)) {
    return false;
  }
  return Number.isInteger(run.pain) && run.pain >= 1 && run.pain <= 10;
}

// Reads runs from the file text. Returns null if the file is not valid.
function readRunsFromText(fileText) {
  let importedRuns;
  try {
    importedRuns = JSON.parse(fileText);
  } catch (error) {
    return null;
  }

  if (!Array.isArray(importedRuns)) {
    return null;
  }
  for (const run of importedRuns) {
    if (!isValidRun(run)) {
      return null;
    }
  }
  return importedRuns;
}

// Replaces all current runs with the imported runs and saves them.
function replaceRuns(importedRuns) {
  runs.length = 0;

  for (const run of importedRuns) {
    let note = "";
    if (typeof run.note === "string") {
      note = run.note;
    }
    runs.push({ date: run.date, time: run.time, kilometers: run.kilometers, pain: run.pain, note: note });
  }

  sortRuns();
  saveRuns();
  showAllSections();
}

// Checks the imported file text and, after confirmation, uses its runs.
function handleImportedText(fileText) {
  const importedRuns = readRunsFromText(fileText);

  if (importedRuns === null) {
    alert("Die Datei konnte nicht importiert werden. Bitte wähle eine exportierte Lauf-Datei.");
    return;
  }

  const question = "Deine aktuellen " + runs.length + " Läufe werden durch " +
    importedRuns.length + " importierte Läufe ersetzt. Fortfahren?";
  if (confirm(question)) {
    replaceRuns(importedRuns);
  }
}

// Reads the file the user picked for the import.
function importRuns() {
  const file = importInput.files[0];
  if (file === undefined) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", function () {
    handleImportedText(reader.result);
  });
  reader.readAsText(file);
  importInput.value = "";
}

runForm.addEventListener("submit", addRun);
painInput.addEventListener("input", updatePainIndicator);
exportButton.addEventListener("click", exportRuns);
importInput.addEventListener("change", importRuns);
setCurrentDateAndTime();
updatePainIndicator();
loadRuns();
