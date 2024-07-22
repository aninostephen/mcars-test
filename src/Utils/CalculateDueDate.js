import dayjs from "dayjs"

export const calculateDate = (startDate, monthPaid = 0) => {
    if (startDate) return 0; 

    const daysPaid = monthPaid * 30;
    const currentDay = dayjs();
    const initialDate = dayjs(startDate).add(daysPaid, 'day');
    return currentDay.diff(initialDate, 'month');
}

export const getRemainingBalance = (montlyAmort, monthContract, monthPaid) => {
    return parseInt(montlyAmort) * (parseInt(monthContract) - parseInt(monthPaid));
}
