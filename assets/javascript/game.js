
 var elem = document.getElementById("robin"); 
 var elem2 = document.getElementById("arrow"); 
 var elem1 = document.getElementById("rope-break")

var game = {

guesses: 9,
guess_array: 0,
userGuess: [""],
guess_string: "",
word_list: ["SWORD","ARROW","SHERIFF","NOTTINGHAM","LITTLEJOHN","ROBINHOOD","MAIDMARIAN"],
start: true,
word_string: "",
word: [""],
blank_word: [""],
word_display: "",
wins: 0,
audio1: new Audio('assets/sounds/rope-swing.mp3'),
audio2: new Audio('assets/sounds/bow-fire.mp3'),
audio3: new Audio('assets/sounds/rope-snap.mp3'),
audio4: new Audio('assets/sounds/death.mp3'),
audio5: new Audio('assets/sounds/trumpets.mp3'),
image_src: [
"assets/images/image-1.png",
"assets/images/image-2.png",
"assets/images/image-3.png",
"assets/images/image-4.png",
"assets/images/image-5.png",
"assets/images/image-6.png",
"assets/images/image-7.png",
"assets/images/image-8.png",
"assets/images/image-9.png",
"assets/images/death.png"],
image_array: 1,
currentguess: "",
you_win: false,

// Set up the game

initial: function() {

	$("#guesslist").html(game.guesses);
	$("#display").html(game.word_display);
	$("#letters_guessed").html(game.guess_string);
	$("#wincount").html(game.wins);

	},

// Display word (as blanks)

game_start: function() {



		game.word_string = game.word_list[Math.floor(Math.random() * game.word_list.length)];
    	game.word  = game.word_string.split('');
    	game.word_display = ""
    	game.start=false;
    	console.log(game.word_string);
    	for (var i = 0; i < game.word.length; i++) {
    		
    			game.blank_word[i]= "_";
    		if(i===0) {
    			$("#display").html(game.blank_word[i]);
    		}
    		else {
    			$("#display").append("   " + game.blank_word[i]);
    		}
    		
    	}

    
	},

// Make sure guess is valud character and hasn't already been guessed

valid: function() {


	var valid = true;

	

	if (game.currentguess >= 'A' && game.currentguess <= 'Z') {

	    // Check to see whether letter has already been guessed
	    if (game.guess_array!==0) {

	    	for (var i = 0; i < game.guess_array; i++) {
	    		
		    	if (game.userGuess[i] == game.currentguess) {

		    		valid = false;
		    	
		    	}
	    	}

		}
	}
	else {
		
		valid=false;
	}

	return valid;

},

//Add guessed letter to array of guesses

add_guess: function() {


	    game.userGuess[game.guess_array]=game.currentguess;
	    
	    if (game.guess_array === 0) {
	    	
	    	$("#letters-guessed").html(game.userGuess[game.guess_array]);
	    }
	    else {

	    	$("#letters-guessed").append(" , " + game.userGuess[game.guess_array]);
	    }
	    game.guess_array++;



},

// Check to see whether guess is correct

is_correct: function() {

	var correct=false;
	  
	   	for (var i = 0; i < game.word.length; i++) {
	   		if (game.currentguess===game.word[i]) {
	   			game.blank_word[i]=game.word[i];
	   			correct=true;
	   		}
	   	}

	   	return correct;

},

// Add all instances of correct guess to word display and check to see if word completed

right: function() {

	game.you_win=true;

	for (var i = 0; i < game.word.length; i++) {

		if (i===0) {

			$("#display").html(game.blank_word[i]);
		}
		else {

			$("#display").append("   " + game.blank_word[i]);
		}
	   	if (game.word[i] !== game.blank_word[i]) {

	   		game.you_win = false;
	   			}
	   	}

	if(game.you_win) {

		game.wins++;
		game.winAnimate();

	}

	   	
},

// Subtract chance if guess is incorrect and check for game lost

wrong: function() {

	game.guesses--;
	$("#content").attr("src",game.image_src[game.image_array]);
	$("#guesslist").html(game.guesses);
	if (game.guesses === 0) {

		game.death();
	}
	else {

		game.audio1.play();
		game.image_array++;

	}
},

//Play winning animation

winAnimate: function () {


 
  elem.style.display = "inline";  
  var pos = 0;
  var id = setInterval(frame, 5);
  game.audio5.play();
  function frame() {
    if (pos === 250) {
      clearInterval(id);
      elem.src = "assets/images/robin-hood-shoot.png";
      game.audio2.play();
      game.arrowAnimate();

    } else {
      pos++; 
      elem.style.bottom = -440 + pos + 'px'; 
     
      
    }
    
  }


},

//Second part of winning animation

arrowAnimate: function () {

		elem2.style.display = "inline";  
		  var pos = 0;
		  var id = setInterval(frame, 1);
		  function frame() {
		    if (pos === 800) {
		      clearInterval(id);
		      game.reset();
		      
		    } else {
		      pos=pos+2; 
		      elem2.style.left = 130 + pos + 'px'; 
		      if (pos === 200) {
		      	elem1.style.display = "inline";
		      	game.audio3.play();


		      }
		      
		    }
		  }

},

//Reset game

reset: function() {

	elem2.style.display = "none";
	elem1.style.display = "none";
	elem.style.display = "none";
	elem.src = 'assets/images/robin-hood.png';
	elem2.style.left = 130 + 'px';
	elem.style.bottom = -440 + 'px';
	game.word_string = "";
	game.word = [""];
	game.blank_word = [""];
	game.letters_guessed = [""];
	game.guesses=9;
	game.guess_array = 0;
	game.userGuess = [""];
	game.guess_string = " "
	game.image_array=1;
	game.start=true;
	$("#letters-guessed").html(game.guess_string);
	$("#wincount").html(game.wins);
	$("#content").attr("src", game.image_src[0]);
	$("#guesslist").html(game.guesses);
	console.log("Game reset");

	return function () {
		alert("reset")
	}

},

//Play dying sound and reset game

death: function() {


	game.audio4.play();
	setTimeout(game.reset, 1500);

},


	
};


//Start of actual script
//Start of actual script
//Start of actual script
//Start of actual script
//Start of actual script

game.winAnimate();
game.initial();


// This function is run whenever the user presses a key.
document.onkeyup = function(event) { 

	if (game.start) {

	game.game_start();

}

else {

	game.currentguess = event.key.toUpperCase();
	if (game.valid()) {


		game.add_guess();

		if(game.is_correct()) {

			game.right();
			

		}

	else {

		game.wrong();
	}

	}
	

}


};  // End of event function


