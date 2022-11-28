export default (writtenWords: string[], msPassed: number) => {
  if (writtenWords.length === 0 || msPassed === 0) return 0;

  const lettersUsed = writtenWords.join('').length;
  const minutesPassed = msPassed / 1000 / 60;

  return Math.round((lettersUsed / 5) / minutesPassed);
};
