import './style.css'
let startTime = null;
let elapsed = 0;
let running = false;
let interval;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  return (
    String(date.getUTCHours()).padStart(2, '0') + ":" +
    String(date.getUTCMinutes()).padStart(2, '0') + ":" +
    String(date.getUTCSeconds()).padStart(2, '0') + "." +
    String(Math.floor(ms % 1000 / 10)).padStart(2, '0')
  );
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

document.getElementById("start").onclick = () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById("start").textContent = "Pause";
  } else {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    running = false;
    document.getElementById("start").textContent = "Start";
  }
};

document.getElementById("lap").onclick = () => {
  if (!running && elapsed === 0) return;
  const current = running ? Date.now() - startTime + elapsed : elapsed;
  const lapItem = document.createElement("li");
  lapItem.textContent = formatTime(current);
  laps.prepend(lapItem);
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  running = false;
  elapsed = 0;
  display.textContent = "00:00:00.00";
  document.getElementById("start").textContent = "Start";
  laps.innerHTML = "";
};
