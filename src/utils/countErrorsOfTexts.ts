interface Props {
  words: string[]
  writtenWords: string[]
  activeIndex: number
}

export default ({ words, writtenWords, activeIndex }: Props) => {
  let errorCount = 0;

  // [todo] sadece aktif kelimeye kadar olan kelimeleri loopla
  words.forEach((word, index) => {
    const writtenWord = writtenWords[index];

    // [todo] boşluğa tıklanmamalı bir input yoksa
    if (activeIndex > index && !writtenWord) {
      errorCount += word.length;
      return;
    }

    if (!writtenWord) return;

    [...word].forEach((letter, letterIndex) => {
      const writtenLetter = writtenWord[letterIndex];

      if (!writtenLetter) {
        if (activeIndex > index) {
          errorCount += 1;
        }

        return;
      }

      if (letter !== writtenLetter) {
        errorCount += 1;
      }
    });
  });

  return errorCount;
};
