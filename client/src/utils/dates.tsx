import { EventType, EventsByDayType } from "../types";

export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

export const getFirstDayOfTheMonth = (month: number, year: number) =>
  new Date(year + '-' + month + '-01').getDay();

export const getMonthName = (monthNumber: number) => {
  const date = new Date(2020, monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
};

export const formatEvents = (events: EventType[]): EventsByDayType => {
  const eventsByDay: EventsByDayType = {};

  events.forEach((event) => {
    const startDate = new Date(event.startDate).getDate();
    const endDate = new Date(event.endDate).getDate();

    for (let i = startDate; i <= endDate; i++) {
      if (!eventsByDay[i]) {
        eventsByDay[i] = [];
      }

      eventsByDay[i].push(event);
    }
  });
  return eventsByDay;
};