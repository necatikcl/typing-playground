const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const formatPercentage = (value: number) => formatter.format(value);

export default formatPercentage;
