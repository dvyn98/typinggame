// all of our quotes
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// the starting time and other variables
let startTime = Date.now();
let correctCharacters = 0;
let totalCharactersTyped = 0;

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(' ');
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) { return `<span>${word} </span>` });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';
  // Clear any prior messages
  messageElement.innerText = '';

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = '';
  // set focus
  typedValueElement.focus();

  // Reset other variables
  correctCharacters = 0;
  totalCharactersTyped = 0;
  startTime = Date.now();
});

typedValueElement.addEventListener('input', () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = Date.now() - startTime;
    const totalMinutes = elapsedTime / 1000 / 60; // Convert elapsed time to minutes
    const wordsPerMinute = totalCharactersTyped / 5 / totalMinutes; // Assuming an average of 5 characters per word

    

    const message =
      `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds. ` +
      `Your Words Per Minute (WPM) is ${wordsPerMinute.toFixed(2)}.`;


    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';

    // Update word and accuracy count for correctly typed words
    if (typedValue.trim() === currentWord) {
      correctCharacters += currentWord.length;
    }
    totalCharactersTyped += currentWord.length;
  }else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.style.backgroundColor = ''; // Reset background color to default
  } else {
    // error state
    typedValueElement.style.backgroundColor = 'red'; // Set background color to red
  }
});