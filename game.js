var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startedToToggle = false;

function playSound(){
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        var audio = new Audio("sounds/" + userChosenColour + ".mp3");
        audio.play();
        animatePress(userChosenColour);
        console.log(userClickedPattern)
        checkAnswer(userClickedPattern.length - 1);
    })

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");  
    },300);

}

$("body").keypress(function(){
    if(!startedToToggle){
        nextSequence();
        $("h1").text("Level " + level);
        startedToToggle = true;
    }
});
playSound();

function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
        console.log("Success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomChosenColour = buttonColors[Math.floor(Math.random()*buttonColors.length)];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function startOver(){
    gamePattern = [];
    level = 0;
    startedToToggle = false;
}