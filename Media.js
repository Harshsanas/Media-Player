
//Creating Audio Bar using WaveSurfer.js

var audiomusic = WaveSurfer.create({
  container: ".audioTrack",
  waveColor: "grey",
  progressColor: "red",
  barWidth:2 
});

audiomusic.load("./audio/music1.mp3");


const btn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

stopBtn.addEventListener("click", () => {
  stop();
});
btn.addEventListener("click", () => {
  startBars();
});
resetBtn.addEventListener("click", () => {
  newBars();
  i = 0;
  clearInterval(barsInterval);
});

