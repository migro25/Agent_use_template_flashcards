const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const formMessage = document.getElementById("form-message");
const wordList = document.getElementById("word-list");
const practiceCard = document.getElementById("practice-card");

const wordPairs = [];
let isGermanVisible = false;

// Loads saved word pairs from the browser.
function loadWordPairs() {
  const savedWordPairs = localStorage.getItem("wordPairs");

  if (savedWordPairs !== null) {
    const parsedWordPairs = JSON.parse(savedWordPairs);

    for (const wordPair of parsedWordPairs) {
      wordPairs.push(wordPair);
    }
  }

  showWordPairs();
  showPracticeCard();
}

// Saves all word pairs in the browser.
function saveWordPairs() {
  localStorage.setItem("wordPairs", JSON.stringify(wordPairs));
}

// Shows all saved word pairs in the list.
function showWordPairs() {
  wordList.textContent = "";

  for (let index = 0; index < wordPairs.length; index++) {
    const wordPair = wordPairs[index];
    const listItem = document.createElement("li");

    const wordText = document.createElement("span");
    wordText.textContent = wordPair.english + " - " + wordPair.german;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.type = "button";
    deleteButton.dataset.index = index;
    deleteButton.addEventListener("click", deleteWordPair);

    listItem.appendChild(wordText);
    listItem.appendChild(deleteButton);
    wordList.appendChild(listItem);
  }
}

// Shows the English side of the first word pair.
function showPracticeCard() {
  isGermanVisible = false;

  if (wordPairs.length === 0) {
    practiceCard.textContent = "Noch keine Wortpaare zum Üben.";
    practiceCard.disabled = true;
    return;
  }

  practiceCard.textContent = wordPairs[0].english;
  practiceCard.disabled = false;
}

// Reveals or hides the German side of the practice card.
function flipPracticeCard() {
  if (wordPairs.length === 0) {
    return;
  }

  isGermanVisible = !isGermanVisible;

  if (isGermanVisible) {
    practiceCard.textContent = wordPairs[0].german;
  } else {
    practiceCard.textContent = wordPairs[0].english;
  }
}

// Deletes a word pair from the list.
function deleteWordPair(event) {
  const index = Number(event.target.dataset.index);
  wordPairs.splice(index, 1);

  saveWordPairs();
  showWordPairs();
  showPracticeCard();
  formMessage.textContent = "Wortpaar gelöscht.";
}

// Adds a word pair when the form is submitted.
function addWordPair(event) {
  event.preventDefault();

  const englishWord = englishInput.value.trim();
  const germanWord = germanInput.value.trim();

  if (englishWord === "" || germanWord === "") {
    formMessage.textContent = "Bitte beide Felder ausfüllen.";
    return;
  }

  wordPairs.push({
    english: englishWord,
    german: germanWord
  });

  saveWordPairs();
  showWordPairs();
  showPracticeCard();
  formMessage.textContent = "Wortpaar hinzugefügt.";
  wordForm.reset();
  englishInput.focus();
}

wordForm.addEventListener("submit", addWordPair);
practiceCard.addEventListener("click", flipPracticeCard);
loadWordPairs();