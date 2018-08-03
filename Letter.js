var Letter = function(character){
    this.letter = character;
    this.guessed = false;
    this.hasBeenGuessed = function(){
        if(!this.guessed){
            return "_ ";
        }
        else {
            return this.letter + " ";
        }
    }
    this.checkCharacter = function(guessedLetter) {
        if (guessedLetter == this.letter){
            this.guessed = true;
        }
    }
}

module.exports = Letter;