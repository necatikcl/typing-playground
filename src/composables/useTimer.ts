import useReactiveStorage from './useReactiveStorage';

const TIMER_SENSIVITY = 50;

export default (key = 'ms-passed') => {
  const msPassed = useReactiveStorage(`tp:${key}`, 0);

  const timerIsRunning = ref(false);

  let interval: number;

  const startTimer = () => {
    if (timerIsRunning.value) return;
    timerIsRunning.value = true;

    clearInterval(interval);

    interval = setInterval(() => {
      msPassed.value += TIMER_SENSIVITY;
    }, TIMER_SENSIVITY);
  };

  const stopTimer = () => {
    if (!timerIsRunning.value) return;
    timerIsRunning.value = false;

    clearInterval(interval);
  };

  const resetTimer = () => {
    stopTimer();
    msPassed.value = 0;
  };

  return {
    msPassed, timerIsRunning, startTimer, stopTimer, resetTimer,
  };
};
