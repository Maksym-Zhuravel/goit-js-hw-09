const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', changingColorHandler);
stopBtn.addEventListener('click', discardChangingColorHandler);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}


function changingColorHandler() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)


    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function discardChangingColorHandler() {
    clearInterval(timerId)


    startBtn.disabled = false;
    stopBtn.disabled = true;
}