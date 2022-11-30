interface Props {
  words: string[]
  writtenWords: string[]
  activeIndex: number
}

export default ({ words, writtenWords, activeIndex }: Props) => {
  let errorCount = 0;

  // [TODO] loop through only the words up to the active word
  words.forEach((word, index) => {
    const writtenWord = writtenWords[index];

    // [TODO] there must not be case in which there is not a writtenWord
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
