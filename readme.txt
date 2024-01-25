Hangman Game Project

A very popular word guessing game. A secret word is being chosen,
and a player or group of players are given a number of attempts to
guess the word. Each time a player guesses wrong, a man is getting
close to being hanged.

My Variation:
A random word is selected from a predefined list of words. Player(s) are
to try to guess each letter in the word. A timer is created - 
this is optional - and player(s) is/are given a number of attempts 
based on the length of the word. Each time a player guess wrong, the number 
of attempts is reduced by 1 and each time they guess right it increases by 2.

Components:
- HTML User Interface (All Required)
    - Create an onscreen keyboard for user input
    - A box that will contain a partiular number of dashes depending
    on the number of letters in the word.
    - And a large textbox that will contain information about the game
    
- Style User Interface
    - Center all boxes and space evenly (MVP)
    - Design Textbox, lettersbox and onscreen keyboard (optional)
    - Add animations. (optional)
    
- Random word Picker (MVP)
- Update UI Based on Word
    - Number of dashes updated in lettersbox
    - Correct letters in their positions
    - Game Info on large Textbox
- Get User Input
    - From onscreen keyboard (MVP)
    - From physical keyboard (optional)
- Word Object: 
    - Holds the Attempt Variable or timer(optional)
    - Get position of guessed letter(s) in word.
    - Holds info for remaining letters and guessed letters.
- Timer (Extra Feature)

Moving Parts:
* Variables that will constantly change during the game*
- Word Object
- Guess Object
- Timer Variable (optional)

Control Flow (Algorithm):
Step 0: Start
Step 1: Word = randomWord(words)
Step 2: Create a word Object
            word[attempts] = word.length + 2;
            word[guess] = {all, correctLetters}
            ....
Step 3: Do {
        Step 1: get user input,
        Step 2: If user input not in word Then word.attempts -1
        Else word.attempts +2 update UI and guess object
    } while word[attempts] != 0;
    
Step 4: if attempts == 0 and correctLetters.length != word.length
            gameOver()
        Else gameWon()
Step 5: END5