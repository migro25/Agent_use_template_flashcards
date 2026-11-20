const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const formMessage = document.getElementById("form-message");

const wordPairs = [];

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

  formMessage.textContent = "Wortpaar hinzugefügt.";
  wordForm.reset();
  englishInput.focus();
}

wordForm.addEventListener("submit", addWordPair);