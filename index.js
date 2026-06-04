addButtonCLicks();

const colorArray = ["green", "red", "yellow", "blue"];
let roundCount = 0;
let gameState = false;
let soundSequence = [];
let playSequence = [];

function startGame() {
  playSequence = [];
  roundCount += 1;
  let randomNumber = randomNumberfromZero(colorArray.length);
  let randomColor = colorArray[randomNumber];
  soundSequence.push(randomNumber);
  playSound(randomColor);
  changeRoundCount(roundCount);
  flashButton($("#" + randomColor), randomColor);
}

function matchSequrence(soundSequence, playSequence) {
  debugger;
  console.log("Runining [" + soundSequence + "]|[" + playSequence + "]");
  if (checkSameElementArray(soundSequence, playSequence)) {
    if (soundSequence.length == playSequence.length) {
      setTimeout(() => {
        startGame();
      }, 2000);
    }
  } else {
    flashWindowWrong();
    gameState = false;
    resetGame();
  }
}

function resetGame() {
  roundCount = 0;
  $(".heading").html("<h1> Press 'Play' to start!</h1>");
  playSequence = [];
  soundSequence = [];
}

$(window).on("keydown", function (event) {
  if (!gameState){
    if (event.key == "Enter") {
      gameState = true;
      startGame();
    }
  }
});
$(".play-button").on("click",  function (event) {
  if (!gameState){
    gameState = true;
    startGame();
  }
});

function changeRoundCount(roundCount) {
  $(".heading").html("<h1> Round " + roundCount + "</h1>");
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

function addButtonCLicks() {
  $("#green").click(function () {
    if (gameState) {
      playSound("green");
      playSequence.push(0);
      matchSequrence(soundSequence, playSequence);
      flashButton(this, "green");
    }
  });
  $("#red").click(function () {
    if (gameState) {
      playSound("red");
      playSequence.push(1);
      matchSequrence(soundSequence, playSequence);
      flashButton(this, "red");
    }
  });
  $("#yellow").click(function () {
    if (gameState) {
      playSound("yellow");
      playSequence.push(2);
      matchSequrence(soundSequence, playSequence);
      flashButton(this, "yellow");
    }
  });
  $("#blue").click(function () {
    if (gameState) {
      playSound("blue");
      playSequence.push(3);
      matchSequrence(soundSequence, playSequence);
      flashButton(this, "blue");
    }
  });
}

function checkSameElementArray(biggerArray, smallerArray) {
  debugger;
  for (let i = 0; i < smallerArray.length; i++) {
    if (biggerArray[i] !== smallerArray[i]) {
      return false;
    }
  }
  return true;
}
