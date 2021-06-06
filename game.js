var gamePattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
var userClickedPattern = [];
var level = 0;
function nextSequence(){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);    
    $("#"+randomChosenColor).delay(50).fadeOut().fadeIn('slow');

    var aud = new Audio("sounds/" + randomChosenColor + ".mp3");
    aud.play();
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function (){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  var aud = new Audio("sounds/" + userChosenColor + ".mp3");
  aud.play();

  $("."+userChosenColor).addClass("pressed");
  setTimeout(() => { 
    $("."+userChosenColor).removeClass("pressed");
  }, 100);

  checkAnswer(userClickedPattern.length -1);
});

$("body").keypress(function(evt){
   if(evt.key == 'a' && level == 0)
   {
    nextSequence();
   }
});

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
     console.log("success");
     if(gamePattern.length === userClickedPattern.length)
     {
       setTimeout(()=>{
         nextSequence();
        },1000);
     }
   }
   else{
     $("body").addClass("game-over");
     setTimeout(()=>{
       $("body").removeClass("game-over");
     },500);

     var g = new Audio("sounds/wrong.mp3");
     g.play();

     $("#level-title").text("Game Over, press A to Restart");
     
     startOver();
   }
}

function startOver(){
  gamePattern = [];
  level = 0;
}









