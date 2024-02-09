export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

export const getFirstDayOfTheMonth = (month: number, year: number) =>
  new Date(year + '-' + month + '-01').getDay();
