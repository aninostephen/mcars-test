export const generateCountData = (len) => Array.from({ length: len }, (_, i) => i + 1);

export const generateMonthlySchedule = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const ordinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
  };

  return days.map(day => `Every ${day}${ordinalSuffix(day)} of the month`);
};

export const NumericFormat = (value) => !value && value?.indexOf(',') === -1 ? value : value?.split(',')?.join('');

export const MoneyFormat = (value) => {
  const num = value && value?.indexOf(',') === -1 ? value : value.split(',').join('');
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(num);
}
