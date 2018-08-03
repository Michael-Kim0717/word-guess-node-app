var word = require('./Word');
var letter = require('./Letter');
var inquirer = require('inquirer');

/* Words to guess. */
var pies = ["Pecan", "Pumpkin", "Apple", "Lemon Meringue", "Key Lime", "Cherry", "Blueberry", "Sweet Potato", "Cream", "Blackberry", "Strawberry", "Rhubarb", "Custard"];
var piesWords = [];

/* Create a list of words which contains a list of letters. */
for (var i = 0; i < pies.length; i++){
    /* Grab each individual word and make a word object out of them. */
    var currentPie = new word();
    currentPie.letters = new Array();
    for (var j = 0; j < pies[i].length; j++){
        currentPie.letters.push(new letter(pies[i].charAt(j)));
    }
    piesWords.push(currentPie);
}

/* Get User Prompt */
function askUserForLetter(){
    inquirer.prompt([{
        name: "letter",
        type: "input",
        message: "Enter in a letter."
    }])
    .then(function(response){
        console.log(response.letter);
    });
}