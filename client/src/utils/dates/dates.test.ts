import {
  getDaysInMonth,
  getFirstDayOfTheMonth,
  getMonthName,
  formatEvents,
} from './dates';

describe('dates', () => {
  test('getDaysInMonth', () => {
    const leapYear = 2020;
    const nonLeapYear = 2021;

    expect(getDaysInMonth(2, leapYear)).toBe(29);
    expect(getDaysInMonth(2, nonLeapYear)).toBe(28);
  });

  test('getFirstDayOfTheMonth', () => {
    const saturday = 6;
    expect(getFirstDayOfTheMonth(1, 2022)).toBe(saturday);
  });

  test('getMonthName', () => {
    expect(getMonthName(1)).toBe('January');
    expect(getMonthName(12)).toBe('December');
  });

  test('formatEvents', () => {
    const events = [
      {
        _id: '1',
        title: 'January Event',
        description: 'This is event 1',
        startDate: '2022-01-01T00:00:00',
        endDate: '2022-01-02T00:00:00',
      },
    ];
    const viewedMonth = 1;
    const viewedYear = 2022;
    const formattedEvents = formatEvents(events, viewedMonth, viewedYear);

    expect(formattedEvents).toEqual({
      1: [
        {
          _id: '1',
          title: 'January Event',
          description: 'This is event 1',
          startDate: '2022-01-01',
          endDate: '2022-01-02',
        },
      ],
      2: [
        {
          _id: '1',
          title: 'January Event',
          description: 'This is event 1',
          startDate: '2022-01-01',
          endDate: '2022-01-02',
        },
      ],
    });
  });
});
