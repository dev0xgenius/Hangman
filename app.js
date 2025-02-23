let startBtn = document.getElementById("startBtn");

startBtn.onclick = function () {
  resetBtns(document.querySelectorAll('.keyboard input'));
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
 
  let word = new Word(random(words).toUpperCase());
  const randomLetter = random(word.letters);
  
  let GuessTracker = {
    all: 0,
    correctLetters: word.letters.filter(letter => letter == randomLetter),
    isValidGuess(word, guessedLetter) {
      return word.letters.includes(guessedLetter.toUpperCase());
    }
  };

  word.GuessTracker = GuessTracker;
  updateUI(word);

  let keyboardBtns = document.querySelectorAll(".keyboard input");
  for (let btn of keyboardBtns) btn.addEventListener("click", handleUserInput);
  
  function handleUserInput(event) {
    if (word.attempt != 0 && word.attempt > 0) {
      const guessedLetter = event.target.innerText;
      const userHasGuessedAll = () => 
        GuessTracker.correctLetters.length === word.letters.length;
      
      if (GuessTracker.isValidGuess(word, guessedLetter)) 
      {
        GuessTracker.correctLetters.push(guessedLetter);
        if (userHasGuessedAll()) {
          keyboardBtns.forEach(btn => btn.removeEventListener("click", handleUserInput));
          alert("You've won the fucking game!! Congratulations...");
        }
        
        word.attempt += 1;
      } else word.attempt -= 1;
    
      word.GuessTracker = GuessTracker;
      GuessTracker.all += 1;
      updateUI(word);
    
    } else if (word.attempt == 0) return;
    
    event.target.setAttribute('disabled', 'disabled');
  }
}


function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function updateUI(word) {
  updateInfoBar(word);
  let letterBox = document.getElementById("letterBox");
  let numOfTags = word.length;
  letterBox.innerHTML = "";
  
  fillHTMLBox(
    letterBox, 
    generateTag('span', numOfTags, (tag, tagNumber) => {
      return () => {
        tag.setAttribute("class", `letter-${tagNumber}`);

        let validGuesses = word.GuessTracker.correctLetters;
        if (validGuesses.includes(word.letters[tagNumber]))
          tag.innerHTML = word.letters[tagNumber];
        
        return tag;
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
    .innerText = `Trial(s): ${word.GuessTracker.all}`;
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
  constructor(word, GuessTracker=null) {
    this.letters = word.split('');
    this.GuessTracker = GuessTracker;

    this.attempt = word.length + 2;
  }

  get length() {
    return this.letters.length;
  }
}