
var guesses = 9;
document.getElementById("guesslist").innerHTML = guesses;

var guess_array = 0;	
 var userGuess = ["Null"];
 var guess_string = "";
 var word_list = ["SWORD","ARROW","SHERIFF","NOTTINGHAM","LITTLEJOHN","ROBINHOOD","MAIDMARIAN"];
 var start = true;
 var word_string = "";
 var word = [""];
 var blank_word = [""];
 var word_display = "";
 var wins = 0;
 var audio1 = new Audio('assets/sounds/rope-swing.mp3');
 var audio2 = new Audio('assets/sounds/bow-fire.mp3');
 var audio3 = new Audio('assets/sounds/rope-snap.mp3');
 var elem = document.getElementById("robin"); 
  var elem2 = document.getElementById("arrow"); 
  var elem1 = document.getElementById("rope-break")

document.getElementById("wincount").innerHTML = wins;
var image_src = [
"assets/images/image-1.png",
"assets/images/image-2.png",
"assets/images/image-3.png",
"assets/images/image-4.png",
"assets/images/image-5.png",
"assets/images/image-6.png",
"assets/images/image-7.png",
"assets/images/image-8.png",
"assets/images/image-9.png",
"assets/images/death.png"];
var image_array = 1;
// robin_animate();


	

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
    		word_display = word_display + "   " + blank_word[i] + "   ";
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
	   		document.getElementById("content").src = image_src[image_array];
	   		audio1.play();
	   		image_array++;
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
    	word_display = word_display + "    " + blank_word[i] + "    ";
	    }
	   

	  
	   	// Display updated elements
	    document.getElementById("guesslist").innerHTML = guesses;    
	   	document.getElementById("letters-guessed").innerHTML = guess_string;
	   	document.getElementById("display").innerHTML = word_display;

	   	 //Check if game has been won or lost and reset variables
	    if (word_complete) {
	    	
	    	robin_animate();
	    	
	    	
	    	start=true;
	    	wins++;
	    	document.getElementById("wincount").innerHTML = wins;
	    }
	    
	   	if (guesses===0) {
	   		
	   		death();
	   		start=true;
	   	}

	   	
	   }

   }
   
   }
};

//Winning animation

function robin_animate() {


 
  elem.style.display = "inline";  
  var pos = 0;
  var id = setInterval(frame, 5);
  
  function frame() {
    if (pos === 250) {
      clearInterval(id);
      elem.src = "assets/images/robin-hood-shoot.png";
      audio2.play();
      arrow_animate();

    } else {
      pos++; 
      elem.style.bottom = -500 + pos + 'px'; 
     
      
    }
    
  }


}

function arrow_animate() {

	elem2.style.display = "inline";  
  var pos = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos === 800) {
      clearInterval(id);
      reset();
      
    } else {
      pos=pos+2; 
      elem2.style.left = 200 + pos + 'px'; 
      if (pos === 350) {
      	elem1.style.display = "inline";
      	audio3.play();


      }
      
    }
  }

}

function reset() {

	elem2.style.display = "none";
	elem1.style.display = "none";
	elem.style.display = "none";
	elem.src = 'assets/images/robin-hood.png';
	elem2.style.left = 200 + 'px';
	elem.style.bottom = -500 + 'px';
	word_string = "";
	word = [""];
	blank_word = [""];
	letters_guessed = [""];
	guesses=9;
	guess_array = 0;
	userGuess = [""];
	guess_string = ""
	image_array=1;
	document.getElementById("content").src = image_src[0];
};

function death() {


	
}