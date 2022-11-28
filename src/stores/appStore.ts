import { defineStore } from 'pinia';
import useTimer from '../composables/useTimer';
import calculateWpm from '../utils/calculateWpm';
import countErrorsOfTexts from '../utils/countErrorsOfTexts';
import useReactiveStorage from '../composables/useReactiveStorage';

const exampleText = 'Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500\'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960\'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.';

const useAppStore = defineStore('appStore', () => {
  const {
    msPassed, timerIsRunning, startTimer, stopTimer, resetTimer,
  } = useTimer();

  const text = useReactiveStorage('tp:text', exampleText.repeat(4));
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

  const wpm = computed(() => calculateWpm(writtenWordsIncludingCurrent.value, msPassed.value));
  const errors = computed(() => countErrorsOfTexts({
    words: words.value,
    writtenWords: writtenWordsIncludingCurrent.value,
    activeIndex: activeIndex.value,
  }));

  const keystrokes = computed(() => writtenWordsIncludingCurrent.value.join('').length);

  const errorPercentage = computed(() => (keystrokes.value === 0
    ? 0 : (errors.value / keystrokes.value)));

  const restart = () => {
    console.log('restart');
    resetTimer();

    writtenWords.value = [];
    activeIndex.value = 0;
    currentWord.value = '';
  };

  const pushCurrentWord = () => {
    const word = currentWord.value.trim();

    if (!word) return;

    writtenWords.value.push(word);
    currentWord.value = '';
    activeIndex.value += 1;
  };

  watch(text, restart);

  return {
    text,
    msPassed,
    writtenWords,
    writtenWordsIncludingCurrent,
    keystrokes,
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
    pushCurrentWord,
  };
});

export default useAppStore;
