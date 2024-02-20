var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
}

$(".btn").on( "click", function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userClickPattern.length -1);
});

function playSound(colorName){
    var audio = new Audio('./sounds/'+colorName+'.mp3');
    audio.play();
}

function animationPress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

var start = false;
$("body").keypress(function(){
    if(start === false){
        nextSequence();
        start = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length){
            userClickPattern = [];

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any key press");
        startOver(); 
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}


