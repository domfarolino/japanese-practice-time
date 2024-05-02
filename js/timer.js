const timer = new easytimer.Timer();

countdown.onclick = e => {
  // Start the timer if it is not running.
  if (!timer.isRunning()) {
    timer.start({countdown: true, startValues: {seconds: 300}});
    timerValue.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    timerEmoji.innerText = '⏸️ ';
    return;
  }

  // Otherwise, toggle the pause.
  if (timer.isRunning()) {
    timer.pause();
    timerEmoji.innerText = '▶️';
  } else {
    console.assert(timer.isPaused());
    timer.start();
    timerEmoji.innerText = '⏸️ ';
  }
};

timer.addEventListener('secondsUpdated', e => {
  timerValue.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
});

timer.addEventListener('targetAchieved', e => {
  timerValue.innerHTML = '🛑 Done! 🛑';
});
