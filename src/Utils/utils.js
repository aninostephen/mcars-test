export const generateCountData = (len, add = 1) => Array.from({ length: len }, (_, i) => i + add);

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
  const num = value && value?.toString()?.indexOf(',') === -1 ? value : value?.toString().split(',').join('');
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(num);
}

export const dateFormat = 'MMM D, YYYY';

export const GetRemainingBalance = (data) => {
  return data?.ledger ? data?.ledger.map((item) => {
    return item.status_amort === 'UNPAID' ? item.amortization : false;
  }).filter(Boolean).reduce((acc, num) => acc + Number(num), 0) : 0;
}

export const ISOFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ'