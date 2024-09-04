import dayjs from "dayjs";

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

export const generateYears = (startYear = 1999) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
      years.push({ id: year.toString(), name: year.toString() });
  }
  return years;
}

export const ordinalSuffix = (d) => {
  const day = parseInt(d);
  if (day === 1 || day === 21 || day === 31) {
    return `${day}ST`;
  } else if (day === 2 || day === 22) {
    return `${day}ND`;
  } else if (day === 3 || day === 23) {
    return `${day}RD`;
  } else {
    return `${day}TH`;
  }
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

export const getNextPayableAmortization = (data) => {
  if (!data) {
    return false
  }

  const amort = data.filter((dt) => dt?.status_amort === 'UNPAID');
  return amort.length > 0 ? dayjs(amort[0]?.due_date).format('MMM, D, YYYY') : '';
}

export const getValueById = (id, units) => {
  if (!id) return [];
  return units.filter((unit) => unit?.id === id);
}

export const paymentStatusUtils = (dt) => {
  let paymentStatus;
  switch(dt){
      case 0:
          paymentStatus = '--'
          break;
      case 1:
          paymentStatus = 'Waiting for approved'
          break;
      case 2:
          paymentStatus = 'Paid'
          break;
  }

  return paymentStatus;
}

export const paymentStatusColor = (dt) => {
  let paymentStatus;
  switch(dt){
      case 0:
          paymentStatus = 'warning'
          break;
      case 1:
          paymentStatus = 'warning'
          break;
      case 2:
          paymentStatus = 'warning'
          break;
  }

  return paymentStatus;
}