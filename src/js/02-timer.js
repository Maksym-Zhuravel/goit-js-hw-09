import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
}



refs.startBtn.addEventListener('click', onStartTimer)
refs.startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      
        if (selectedDates[0] < new Date) {
          Notiflix.Notify.failure(`Please choose a date in the future`);
          refs.startBtn.disabled = true
      } else {
          refs.startBtn.disabled = false;
      }
  },
};

flatpickr("input#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



function onStartTimer(){

    const timerId = setInterval(() => {
        const differenceInTime = new Date(refs.input.value) - Date.now();
        
        let timer = convertMs(differenceInTime)


    refs.daysValue.textContent = addLeadingZero(timer.days);
    refs.hoursValue.textContent = addLeadingZero(timer.hours);
    refs.minutesValue.textContent = addLeadingZero(timer.minutes);
    refs.secondsValue.textContent = addLeadingZero(timer.seconds);
    }, 1000)
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}







