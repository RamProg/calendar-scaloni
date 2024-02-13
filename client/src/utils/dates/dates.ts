import { EventType, EventsByDayType, MonthType } from '../../types';

export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

export const getFirstDayOfTheMonth = (month: number, year: number) =>
  new Date(year + '-' + month + '-01').getDay();

export const getMonthName = (monthNumber: number) => {
  const date = new Date(2020, monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
};

export const currentMonth = new Date().getMonth() + 1;

export const currentYear = new Date().getFullYear();

export const formatEvents = (
  events: EventType[],
  viewedMonth: MonthType,
  viewedYear: number
): EventsByDayType => {
  const eventsByDay: EventsByDayType = {};

  events.forEach((event) => {
    const startDateStringISO = event.startDate;
    const endDateStringISO = event.endDate;

    const startDate = startDateStringISO.split('T')[0];
    const endDate = endDateStringISO.split('T')[0];

    const startYear = Number(startDate.split('-')[0]);
    const startMonth = Number(startDate.split('-')[1]);
    const startDay = Number(startDate.split('-')[2]);

    const endYear = Number(endDate.split('-')[0]);
    const endMonth = Number(endDate.split('-')[1]);
    const endDay = Number(endDate.split('-')[2]);

    let beginDay = startDay;
    let finishDay = endDay;

    const endsInFollowingMonth = endMonth > viewedMonth || endYear > viewedYear;
    const startsInPreviousMonth =
      startMonth < viewedMonth || startYear < viewedYear;

    if (endsInFollowingMonth) {
      finishDay = getDaysInMonth(viewedMonth, viewedYear);
    }

    if (startsInPreviousMonth) {
      beginDay = 1;
    }

    for (let i = beginDay; i <= finishDay; i++) {
      if (!eventsByDay[i]) {
        eventsByDay[i] = [];
      }

      eventsByDay[i].push({
        ...event,
        startDate,
        endDate,
      });
    }
  });
  return eventsByDay;
};
