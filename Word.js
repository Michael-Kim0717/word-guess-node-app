var letter = require('./Letter');

var Word = function(){
    this.letters = [];
    this.returnWord = function(){
        var word = "";
        for (var i = 0; i < this.letters.length; i++){
            word += this.letters[i].hasBeenGuessed();
        }
        return word;
    };
    this.checkEachLetter = function(letter){
        for (var i = 0; i < this.letters.length; i++){
            this.letters[i].checkCharacter(letter);
        }
    }
}

module.exports = Word;