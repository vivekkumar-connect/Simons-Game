$("#green").click(function(){
  let audio = new Audio("./Assests/sounds/green.mp3");
  flashButton(this,"green");
  audio.play();
});
$("#red").click(function(){
  let audio = new Audio("./Assests/sounds/red.mp3");
  flashButton(this,"red");
  audio.play();
});
$("#yellow").click(function(){
  let audio = new Audio("./Assests/sounds/yellow.mp3");
  flashButton(this,"yellow");
  audio.play();
});
$("#blue").click(function(){
  let audio = new Audio("./Assests/sounds/blue.mp3");
  flashButton(this,"blue");
  audio.play();
});

const colorArray = ["green","red","yellow","blue"];
const randomNumber = randomNumberfromZero(3);
let randomColor = colorArray[randomNumber];
const numberSequence = [];
playSound(randomColor)


function flashButton(element,color){
    $(element).css("--glow-color", color)
    .addClass("active");
    setTimeout(() => {
        $(element).removeClass("active");
    }, 300); // 300ms baad normal
}

function playSound(color){
  let audio = new Audio("./Assests/sounds/"+color+".mp3");
  audio.play();
}
function randomNumberfromZero(max){
  return Math.floor(Math.random() * (max+1));
}