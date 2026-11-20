const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const formMessage = document.getElementById("form-message");
const wordList = document.getElementById("word-list");

const wordPairs = [];

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

// Deletes a word pair from the list.
function deleteWordPair(event) {
  const index = Number(event.target.dataset.index);
  wordPairs.splice(index, 1);

  showWordPairs();
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

  showWordPairs();
  formMessage.textContent = "Wortpaar hinzugefügt.";
  wordForm.reset();
  englishInput.focus();
}

wordForm.addEventListener("submit", addWordPair);