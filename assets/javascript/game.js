
var guesses = 10;
document.getElementById("guesslist").innerHTML = guesses;

var guess_array = 0;	
 var userGuess = ["Null"];
 var guess_string = "Null";
 var word_list = ["FUNCTION","CONCATENATE","VARIABLE","METHOD","OBJECT","COMPILER","CONSOLE"];
 var start = true;
 var word_string = "";
 var word = [""];
 var blank_word = [""];
 var word_display = "";
 var wins = 0;
	

	

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) { 

    //Determine game start or game continue
    if (start) {

    	word_string = word_list[Math.floor(Math.random() * word_list.length)];
    	word  = word_string.split('');
    	word_display = ""
    	start=false;
    	for (var i = 0; i < word.length; i++) {
    		blank_word[i]= "_";
    		word_display = word_display + blank_word[i];
    	}

    	//Display initial elements
    	 document.getElementById("guesslist").innerHTML = guesses; 
    	 document.getElementById("display").innerHTML = word_display;
    	 document.getElementById("letters-guessed").innerHTML = guess_string;
    	 document.getElementById("wincount").innerHTML = wins;
    }

    else {
    
    var currentguess = event.key.toUpperCase();
    console.log(word);

    // Check to see whether keystroke is a valid character

    if (currentguess >= 'A' && currentguess <= 'Z') {
    	var already_guessed = false;
	    // Check to see whether letter has already been guessed
	    if (guess_array!==0) {

	    	for (var i = 0; i < guess_array; i++) {
	    		
		    	if (userGuess[i] == currentguess) {

		    		already_guessed = true;
		    	
		    	}
	    	}
	    	
	    }

	    // Add letter to string of letters guessed and increase array
	    if (!already_guessed) {
	    userGuess[guess_array]=currentguess;

	    if (guess_array === 0) {
	    	guess_string = userGuess[guess_array]
	    }
	    else {

	    	guess_string= guess_string + " , " + userGuess[guess_array];
	    }
	    guess_array++;
	   	

	   	// Determine whether guess was correct
	   	var correct=false;
	   	console.log(word);
	   	for (var i = 0; i < word.length; i++) {
	   		if (currentguess===word[i]) {
	   			blank_word[i]=word[i];
	   			correct=true;
	   		}
	   	}

	   	// Subtract a guess if letter choice was wrong

	   	if (!correct) {

	   		guesses--;
	   	}
	    
	   	//Check to see if word has been completed
	   	else {
	   		var word_complete=true;
	   		for (var i = 0; i < word.length; i++) {
	   			if (word[i] !== blank_word[i]) {

	   				word_complete = false;
	   			}
	   		}
	   	}
	    //Turn character array of guessed word into string for display

	    var word_display = "";
	   	
	   	for (var i = 0; i < blank_word.length; i++) {
    	word_display = word_display + blank_word[i];
	    }
	   

	  
	   	// Display updated elements
	    document.getElementById("guesslist").innerHTML = guesses;    
	   	document.getElementById("letters-guessed").innerHTML = guess_string;
	   	document.getElementById("display").innerHTML = word_display;

	   	 //Check if game has been won or lost and reset variables
	    if (word_complete) {
	    	alert('You won! Press any key to play again.');
	    	start=true;
	    	wins++;
	    	document.getElementById("wincount").innerHTML = wins;
	    }
	    
	   	if (guesses===0) {
	   		alert('Game Over!');
	   		start=true;
	   	}

	   	if (start) {

			word_string = "";
			word = [""];
			blank_word = [""];
			letters_guessed = [""];
			guesses=10;
			guess_array = 0;
			userGuess = [""];
			guess_string = ""

	   	}
	   }

   }
   
   }
};

