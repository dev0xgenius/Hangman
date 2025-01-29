let startBtn = document.getElementById("startBtn");

startBtn.onclick = function () {
  resetBtns(document.querySelectorAll('.keyboard button'));
  startBtn.innerText = "Reset";
  main();
};

function main() {
  let words = [
    'Money', 'House', 'Food', 'Cringe', 'Monkey',
    'Goat', 'Drugged', 'Place', 'Dinner', 'Turkey',
    'Ronaldo', 'Messi', 'Fantasy', 'Beans', 'Monster',
    'Consider', 'Fool', 'Nigeria', 'Fumble', 'Strong',
    'Laptop', 'Computer', 'Sylvester', 'James', 'Quiver',
    'Shiver', 'Deliver', 'Constant', 'Einstein', 'Crazy',
    'Blunder', 'Demand', 'Supply', 'Cockroach', 'Demons',
    'Diamond', 'Plastic', 'Interest', 'Crypto', 'Danger',
    'Pen', 'Dog', 'Dread', 'Truncate', 'Victim', 'Commit',
  ];
 
  let word = random(words).toUpperCase();
  let guess = {
    all: 0,
    correctLetters: [random(word.split(''))],
    guess(word, userGuess) {
      return word.letters.includes(userGuess.toUpperCase());
    }
  };

  word = new Word(word, guess);
  updateUI(word);

  let buttons = document.querySelectorAll(".keyboard button");
  for (let btn of buttons) {
    btn.addEventListener("click",  (event) => {
      if (word.attempt != 0) {
        if (guess.guess(word, event.target.innerText)) {
          word.attempt += 1;
          guess['correctLetters'].push(event.target.innerText);
        } else word.attempt -= 1;

        word.guess = guess;
        guess['all'] += 1;
        updateUI(word);

      } else if (word.attempt == 0) return;

      event.target.setAttribute('disabled', 'disabled');
    });
  }
}

function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function updateUI(word) {
  let gameBox = document.getElementById("gameBox");
  let letterBox = document.getElementById("letterBox");

  updateInfoBar(word);

  let wordCount = word.length;
  letterBox.innerHTML = "";
  
  fillHTMLBox(
    letterBox, 
    generateTag('span', wordCount, (element, elementCount) => {
      return () => {
        element.setAttribute("class", `letter-${elementCount}`);

        let validGuesses = word.guess.correctLetters;
        if (validGuesses.includes(word.letters[elementCount]))
          element.innerHTML = word.letters[elementCount];
        
        return element;
      };
    })
  );
}

function updateInfoBar(word) {
  let infoBarHTMLElement = gameBox.querySelector('div.info');
  const totalAttempts = (word.length + 2);
  const attemptInPercent = (word.attempt / totalAttempts) * 100; // Used for CSS progress bar
  
  infoBarHTMLElement.querySelector(".attempt.progress_bar .before")
    .style.width = `${attemptInPercent}%`;
  infoBarHTMLElement.querySelector(".guesses")
    .innerText = `Trial(s) ${word.guess.all}`;
}

function generateTag(tagname, count, set_) {
  let element = null;
  let tags = [];

  for (let i = 0; i < count; i++) {
    element = document.createElement(tagname);
    tags.push(set_(element, i));
  }
  return tags;
}

function fillHTMLBox(element, tags) {
  for (let tag of tags) {
    element.append(tag());
  }
}

function resetBtns(buttons) {
  for (let btn of buttons) btn.removeAttribute('disabled');
}

class Word {
  constructor(word, guess) {
    this.letters = word.split('');
    this.guess = guess;

    this.attempt = word.length + 2;
  }

  get length() {
    return this.letters.length;
  }
}