/* -----------VARIABLE CALLS----------- */
    var word = require('./Word');
    var letter = require('./Letter');
    var inquirer = require('inquirer');

    /* Words to guess. */
    var pies = ["pecan", "pumpkin", "apple", "lemon meringue", "key lime", "cherry", "blueberry", "sweet potato", "cream", "blackberry", "strawberry", "rhubarb", "custard"];
    var piesWords = [];

    /* Gameplay variables */
    var numOfGuesses = 5;
    var lettersGuessed = [];

/* -------------FUNCTIONS------------- */
    /* Check if the entered response is a letter. */
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    /* Compare number of guessed letters to total letters. */
    function isCompletelyGuessed(word) {
        var length = word.letters.length;
        var counter = 0;
        for (var i = 0; i < length; i++){
            if (word.letters[i].guessed){
                counter++;
            }
        }
        if (counter == length){
            return true;
        }
        return false;
    }

    /* Compare the number of guessed letters to see if any letters have been guessed correctly. */
    function numGuessed(word){
        var length = word.letters.length;
        var counter = 0;
        for (var i = 0; i < length; i++){
            if (word.letters[i].guessed){
                counter++;
            }
        }
        return counter;
    }

    function restartGame(word){
        console.log("Your word was " + (word.returnWord()).toUpperCase() + "!");
        console.log("============================================================================\n");
        inquirer.prompt([{
            name: "playAgain",
            type: "list",
            choices: ["Yes", "No"],
            message: "Would you like to play again?"
        }])
        .then(function(response){
            if (response.playAgain == "Yes"){
                initiateGame();
            }
            else {
                return;
            }
        });
    }

    /* Get User Prompt. */
    function askUserForLetter(word){
        /* Prompt user to enter in a letter. */
        inquirer.prompt([{
            name: "letter",
            type: "input",
            message: "Enter in a letter."
        }])
        .then(function(response){
            /* If the response is an appropriate letter, check each space for the appropriate character. 
               If the word has not been completely guessed, ask for another letter.
               If the word has been completely guessed, prompt the user if they would like to play again.
               
               If the user has guessed incorrectly, remove a guess from their remaining chances.
               If the user has lost all chances, fill in the remaining word and prompt the user to play again.
               Add the guessed letter into the array of guessed characters.
             */
            if (isLetter(response.letter) && !lettersGuessed.includes(response.letter)){
                var beforeCheck = numGuessed(word);
                word.checkEachLetter(response.letter);
                var afterCheck = numGuessed(word);
                if (beforeCheck == afterCheck) {
                    numOfGuesses--;
                    if (numOfGuesses == 0){
                        console.log("Sorry you lost...\n");
                        for (var i = 0; i < word.letters.length; i++){
                            word.letters[i].guessed = true;
                        }
                        restartGame(word);
                        return;
                    }
                    else {
                        console.log("WRONG LETTER. \n" + numOfGuesses + " number of incorrect guesses remaining.");
                    }
                }
                console.log("Your Word is : " + word.returnWord() + "\n");
                lettersGuessed.push(response.letter);

                if (!isCompletelyGuessed(word)){
                    askUserForLetter(word);
                }
                else {
                    restartGame(word);
                }
            }
            /* If the response is not an appropriate letter, reprompt the user to enter in a letter. */
            else {
                console.log("Wrong input or you may have already guessed this letter, please try again.\n");
                askUserForLetter(word);
            }
        });
    }

    /* Initial start of game. */
    function initiateGame(){
        numOfGuesses = 5;
        lettersGuessed = [];

        /* Create a list of words which contains a list of letters. */
        for (var i = 0; i < pies.length; i++){
            /* Grab each individual word and make a word object out of them. */
            var currentPie = new word();
            currentPie.letters = new Array();
            for (var j = 0; j < pies[i].length; j++){
                var newLetter = new letter(pies[i].charAt(j));
                if (newLetter.letter == " "){
                    newLetter.guessed = true;
                }
                currentPie.letters.push(newLetter);
            }
            piesWords.push(currentPie);
        }
        /* Grab a random word for the user to guess.
           Prompt the user to guess a letter.
         */
        var randomNumber = Math.floor(Math.random() * pies.length);
        var randomPie = piesWords[randomNumber];

        console.log("\n============================================================================");
        console.log("This Word Guess Game Revolves Around Guessing a Flavor of Pie.");
        console.log("\nYour Word is : " + randomPie.returnWord());
        console.log("You have " + numOfGuesses + " number of incorrect guesses remaining.");
        
        /* FOR TESTING ONLY */
        /* var rP = pies[randomNumber];
        console.log(rP); */

        askUserForLetter(randomPie);
    }

/* ------------- GAME ------------- */
    initiateGame();