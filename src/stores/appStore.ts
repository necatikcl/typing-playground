import { defineStore } from 'pinia';
import useReactiveStorage from '../utils/useReactiveStorage';

const TIMER_SENSIVITY = 50;

const exampleText = 'Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500\'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960\'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.';

const useAppStore = defineStore('appStore', () => {
  const text = useReactiveStorage('tp:text', exampleText.repeat(4));
  const msPassed = useReactiveStorage('tp:ms-passed', 0);
  const activeIndex = useReactiveStorage('tp:active-index', 0);
  const writtenWords = useReactiveStorage<string[]>('tp:written-words', []);
  const currentWord = ref('');

  const writtenWordsIncludingCurrent = computed(() => {
    const words = [...writtenWords.value];

    if (currentWord.value.length > 0) {
      words.push(currentWord.value);
    }

    return words;
  });

  const words = computed(() => text.value.split(' '));
  const remainingWords = computed(() => words.value.length - writtenWords.value.length);
  const wpm = computed(() => {
    if (writtenWordsIncludingCurrent.value.length === 0 || msPassed.value === 0) return 0;

    const lettersUsed = writtenWordsIncludingCurrent.value.join('').length;
    const minutesPassed = msPassed.value / 1000 / 60;

    return Math.round((lettersUsed / 5) / minutesPassed);
  });
  const errors = computed(() => {
    let errorCount = 0;

    words.value.forEach((word, index) => {
      const writtenWord = writtenWordsIncludingCurrent.value[index];

      if (activeIndex.value > index && !writtenWord) {
        errorCount += word.length;
        return;
      }

      if (!writtenWord) return;

      [...word].forEach((letter, letterIndex) => {
        const writtenLetter = writtenWord[letterIndex];

        if (!writtenLetter) {
          if (activeIndex.value > index) {
            errorCount += 1;
          }

          return;
        }

        if (writtenLetter && letter !== writtenLetter) {
          errorCount += 1;
        }
      });
    });

    return errorCount;
  });
  const errorPercentage = computed(() => {
    const totalLetters = words.value.slice(0, activeIndex.value).join('').length;

    if (totalLetters === 0) return 0;

    return (errors.value / totalLetters);
  });

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

  const restart = () => {
    stopTimer();

    writtenWords.value = [];
    msPassed.value = 0;
    activeIndex.value = 0;
    currentWord.value = '';
  };

  const editText = () => {
    restart();

    // Known issue: Router can not be used in store, so we can't use router.push here right now.
  };

  watch(text, restart);

  return {
    text,
    msPassed,
    writtenWords,
    writtenWordsIncludingCurrent,
    wpm,
    errors,
    errorPercentage,
    words,
    timerIsRunning,
    activeIndex,
    currentWord,
    remainingWords,
    startTimer,
    stopTimer,
    restart,
    editText,
  };
});

export default useAppStore;
