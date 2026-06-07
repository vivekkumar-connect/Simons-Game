
const colorArray = ["green", "red", "yellow", "blue"];
let roundCount = 0;
let gameState = false;
let acceptInput = false;
let soundSequence = [];
let playSequence = [];
let gameDifficulty = $("input[name='mode-selector']").val();
addButtonCLicks();

var greenAudio = new Audio("./Assests/sounds/green.mp3");
var redAudio = new Audio("./Assests/sounds/red.mp3");
var yellowAudio = new Audio("./Assests/sounds/yellow.mp3");
var blueAudio = new Audio("./Assests/sounds/blue.mp3");
var winAudio = new Audio("./Assests/sounds/win.mp3");
var wrongAudio = new Audio("./Assests/sounds/wrong.mp3");
var clickAudio = new Audio("./Assests/sounds/click.mp3");
var selectAudio = new Audio("./Assests/sounds/select.mp3");

function startRound() {
  playSequence = [];
  roundCount += 1;
  changeRoundCount(roundCount);
  let randomNumber = randomNumberfromZero(colorArray.length);
  soundSequence.push(randomNumber);
  if(gameState){
    console.log("Flashing new color");
    $(".game-heading").text("Watch")
    switch (gameDifficulty){
      //Easy mode
      case "easy":
        for (let i = 0; i < soundSequence.length; i++){
          console.log("Runing "+ soundSequence.length + " - "+ soundSequence)
          let soundSequenceIndex = soundSequence[i];
          let tempColor = colorArray[soundSequenceIndex];
          setTimeout(()=>{
            playSound(tempColor);
            flashButton($("#" + tempColor), tempColor);
          },1000 * (i+1))
        }
        setTimeout(() => {
          changeRoundCount(roundCount);
          $(".game-heading").text("Play")
          console.log("Running 1")
          acceptInput = true;
        }, 1000 * (soundSequence.length) + 500);
        break;
      //Hard Mode
      case "hard":
        setTimeout(()=>{
            let randomColor = colorArray[randomNumber];
            playSound(randomColor);
            flashButton($("#" + randomColor), randomColor);
            changeRoundCount(roundCount);
          },1000);
          setTimeout(() => {
            $(".game-heading").text("Play")
            console.log("Rinnung 2")
            acceptInput = true;
          }, 1500);
          break;
      }
  }
}

function matchSequence(soundSequence, playSequence) {
  if (soundSequence[playSequence.length-1] == playSequence[playSequence.length-1]){
    if (soundSequence.length == playSequence.length){
      console.log("Starting sequence");
      $(".round-count").text("Correct!");
      flashWindowWin();
      acceptInput = false;
      setTimeout(() => {
        startRound();
      }, 1000);
    }
  }else{
    console.log("Sequence didnt match!")
    resetGame();
  }
}

function addButtonCLicks() {
  const gameButtonList = $(".color-button-container .color-button");
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
  gameDifficulty =  $("input[name='mode-selector']").val();
  $(".play-button").removeClass("hide");
  $(".mode-selection").removeClass("hide");
}


// $(window).on("keydown", function (event) {
//   if (!gameState){
//     if (event.key == "Enter") {
//       gameState = true;
//       soundSequence = [];
//       startRound();
//     }
//   }
// });

$(".help-icon").on("click",function(){
  playSound("select");
})

$("input[name='mode-selector']").change(function () {
    gameDifficulty = $(this).val();
    console.log(gameDifficulty);
    playSound("select");
});

$(".play-button").on("click",  function (event) {
  if (!gameState){
    gameState = true;
    soundSequence = [];
    startRound();
  }
  $(this).addClass("hide");
  $(".mode-selection").addClass("hide");
  playSound("click")
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
function flashWindowWin() {
  $("body").addClass("right");
  playSound("win")
  setTimeout(() => {
    $("body").removeClass("right");
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
    case "click":
      clickAudio.currentTime = 0;
      clickAudio.play();
      break;
    case "select":
      selectAudio.currentTime = 0;
      selectAudio.play();
      break;
  }
}

function randomNumberfromZero(length) {
  return Math.floor(Math.random() * length);
}

function changeRoundCount(roundCount) {
  $(".round-count").text("Round "+roundCount);
}
