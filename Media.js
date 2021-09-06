const canvas = document.getElementById("canvas-bars");
const context = canvas.getContext("2d");
var changingLength = 1;
canvas.width = 1000;
canvas.height = 600;
const btn_icon = document.getElementById("ctrl-icon");
const play_pause = document.getElementById("play-pause");
const audio = document.getElementById("audio");
let isPlaying = false;

//initializing to create bars
var width = 5;
var height = [];
var X = 5;
var Y = [];

for (let i = 0; i <= 130; i++) {
  Y.push(Math.floor(Math.random() * 80) + 100);
  height.push(Math.floor(Math.random() * 200) + 100);
}

for (let i = 0; i <= 130; i++) {
  context.beginPath();
  context.fillStyle = "#DADADB";
  if (i == 130) height[i] = 500;
  context.fillRect(X, Y[i], width, height[i]);
  context.closePath();
  X = X + 10;
}



function fillBar(val) {
  var length = val;
  console.log(val);
  X = 5;
  // changing bars color
  context.fillStyle = "red";
  for (let i = 0; i < length; i++) {
    context.beginPath();
    context.fillRect(X, Y[i], width, height[i]);
    context.closePath();
    X = X + 10;
  }
  // resetting bars color
  context.fillStyle = "#DADADB";
  for (let i = length; i <= 130; i++) {
    context.beginPath();
    context.fillRect(X, Y[i], width, height[i]);
    context.closePath();
    X = X + 10;
  }
  // resetting duration after compconsting cycle
  if (changingLength >= 130) {
    audio.pause();
    changingLength = 0;
    btn_icon.src =
      "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
    clearInterval(interval);
  }
}

// Function For Creating Tags;
function nameTag(X, Y, backgroungColor, note) {
  const tagWidth = note.length * 6.6;
  const notePosition = X + tagWidth / 2;

  // Circlular point at the Bottom of tag
  context.beginPath();
  context.arc(notePosition, 220, 5, 0, Math.PI * 2);
  context.fillStyle = backgroungColor;
  context.fill();
  context.closePath();

  //Direction line for tag
  context.beginPath();
  context.moveTo(notePosition, Y + 20);
  context.lineTo(notePosition, 220);
  context.strokeStyle = backgroungColor;
  context.stroke();
  context.closePath();

  //creating rectangle box
  context.fillStyle = backgroungColor;
  context.beginPath();
  context.fillRect(X, Y, tagWidth, 20);

  //Text inside the Rectangle box
  context.fillStyle = "grey";
  context.font = "10pt bold";
  context.fillText(note, X + 5, Y + 15);
}

// jumping to clicked bars
canvas.addEventListener("click", jumpOnCanvas);
function jumpOnCanvas(e) {
  var change_value = Math.round(e.layerX / 10);
  audio.currentTime = change_value;
  console.log(change_value);
  changingLength = change_value;
  fillBar(change_value);
}

// play pause contolling function
play_pause.addEventListener("click", playAudio);

var changingLength = 1;
var interval;
function playAudio() {
  const audio = document.getElementById("audio");

  if (interval == undefined) {
    audio.play();
    btn_icon.src =
      "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56573/pause-button-emoji-clipart-xl.png";

    interval = setInterval(() => {
      fillBar(changingLength);
      changingLength++;
    }, 1000);
    console.log("play");
  } else {
    audio.pause();
    console.log("pause");
    btn_icon.src =
      "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
    clearInterval(interval);
    interval = undefined;
  }
}

