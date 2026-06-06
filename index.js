
const colorArray = ["green", "red", "yellow", "blue"];
let roundCount = 0;
let gameState = false;
let waitForNextColor = false;
let soundSequence = [];
let playSequence = [];
addButtonCLicks();

function startRound() {
  console.log("Starting another round");
  playSequence = [];
  roundCount += 1;
  changeRoundCount(roundCount);
  let randomNumber = randomNumberfromZero(colorArray.length);
  let randomColor = colorArray[randomNumber];
  if(gameState){
    console.log("Flashing new color")
    gameState = false
    setTimeout(()=>{
      playSound(randomColor);
      flashButton($("#" + randomColor), randomColor);
    },500)
    gameState = true
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
      startRound();
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
      let color = $(this).attr("id");
      if (gameState) {
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
  $(".heading").html("<h1>Game over</h1>");
  playSequence = [];
  soundSequence = [];
  flashWindowWrong();
  gameState = false;
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
  if (!gameState){
    gameState = true;
    soundSequence = [];
    startRound();
  }
  $(this).addClass("hide");
});

function checkSameElementArray(biggerArray, smallerArray) {
  for (let i = 0; i < smallerArray.length; i++) {
    if (biggerArray[i] !== smallerArray[i]) {
      return false;
    }
  }
  return true;
}

function flashButton(element, shadowColor) {
  $(element).css("--glow-color", shadowColor).addClass("active");
  setTimeout(() => {
    $(element).removeClass("active");
  }, 300); // 300ms baad normal
}

function flashWindowWrong() {
  $("body").addClass("wrong");
  var wrongButtonAudio = new Audio("./Assests/sounds/wrong.mp3");
  wrongButtonAudio.play();
  setTimeout(() => {
    $("body").removeClass("wrong");
  }, 300); // 300ms baad normal
}

function playSound(color) {
  let audio = new Audio("./Assests/sounds/" + color + ".mp3");
  audio.play();
}

function randomNumberfromZero(length) {
  return Math.floor(Math.random() * length);
}

function changeRoundCount(roundCount) {
  $(".heading").html("<h1> Round " + roundCount + "</h1>");
}
