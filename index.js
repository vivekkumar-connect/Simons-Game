
const colorArray = ["green", "red", "yellow", "blue"];
let roundCount = 0;
let gameState = false;
let acceptInput = false;
let soundSequence = [];
let playSequence = [];
addButtonCLicks();

var greenAudio = new Audio("./Assests/sounds/green.mp3");
var redAudio = new Audio("./Assests/sounds/red.mp3");
var yellowAudio = new Audio("./Assests/sounds/yellow.mp3");
var blueAudio = new Audio("./Assests/sounds/blue.mp3");
var winAudio = new Audio("./Assests/sounds/win.mp3");
var wrongAudio = new Audio("./Assests/sounds/wrong.mp3");

function startRound() {
  console.log("Starting another round");
  playSequence = [];
  roundCount += 1;
  changeRoundCount(roundCount);
  let randomNumber = randomNumberfromZero(colorArray.length);
  let randomColor = colorArray[randomNumber];
  if(gameState){
    console.log("Flashing new color");
    $(".game-heading").text("Watch")
    setTimeout(()=>{
      playSound(randomColor);
      flashButton($("#" + randomColor), randomColor);
      changeRoundCount(roundCount);
    },1000)
    setTimeout(() => {
      $(".game-heading").text("Play")
      acceptInput = true;
    }, 1500);
  }
  soundSequence.push(randomNumber);
}

function matchSequence(soundSequence, playSequence) {
  console.log("Runining [" + soundSequence + "]---[" + playSequence + "]");
  //if last clcicked element == last color sequen
  if (soundSequence[playSequence.length-1] == playSequence[playSequence.length-1]){
    console.log("Same")
    if (soundSequence.length == playSequence.length){
      console.log("Starting sequence");
      $(".round-count").text("Correct!");
      playSound("win")
      acceptInput = false;
      setTimeout(() => {
        startRound();
      }, 1000);
    }
  }else{
    console.log("Sequence didnt match!")
    resetGame();
  }
  //then we wait for time and then run another round 
}

function addButtonCLicks() {
  const gameButtonList = $(".color-button-container .button");
  for (let i = 0; i < gameButtonList.length; i++){
    $(gameButtonList[i]).click(function () {
      let color = this.id;
      if (acceptInput) {
        playSound(color);
        playSequence.push(i);
        matchSequence(soundSequence, playSequence);
        flashButton(this, color);
      }
    });
  }
}

function resetGame() {
  roundCount = 0;
  $(".game-heading").text("Game Over!")
  playSequence = [];
  soundSequence = [];
  flashWindowWrong();
  gameState = false;
  acceptInput = false;
  $(".play-button").removeClass("hide");
}


$(window).on("keydown", function (event) {
  if (!gameState){
    if (event.key == "Enter") {
      gameState = true;
      soundSequence = [];
      startRound();
    }
  }
});

$(".play-button").on("click",  function (event) {
  debugger;
  if (!gameState){
    gameState = true;
    soundSequence = [];
    startRound();
  }
  $(this).addClass("hide");
});

function flashButton(element, shadowColor) {
  $(element).css("--glow-color", shadowColor).addClass("active");
  setTimeout(() => {
    $(element).removeClass("active");
  }, 300); // 300ms baad normal
}

function flashWindowWrong() {
  $("body").addClass("wrong");
  playSound("wrong")
  setTimeout(() => {
    $("body").removeClass("wrong");
  }, 300); // 300ms baad normal
}

function playSound(audio) {
  switch (audio){
    case "green":
      //Current time help play sound rapidly on spaming without an issue
      greenAudio.currentTime = 0;
      greenAudio.play();
      break;
    case "red":
      redAudio.currentTime = 0;
      redAudio.play();
      break;
    case "yellow":
      yellowAudio.currentTime = 0;
      yellowAudio.play();
      break;
    case "blue":
      blueAudio.currentTime = 0;
      blueAudio.play();
      break;
    case "win":
      winAudio.currentTime = 0;
      winAudio.play();
      break;
    case "wrong":
      winAudio.currentTime = 0;
      wrongAudio.play();
      break;
  }
}

function randomNumberfromZero(length) {
  return Math.floor(Math.random() * length);
}

function changeRoundCount(roundCount) {
  $(".round-count").text("Round "+roundCount);
}
