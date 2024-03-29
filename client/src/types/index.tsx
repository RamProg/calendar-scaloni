export type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type EventType = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type EventsByDayType = {
  [day: string]: EventType[];
};

export type EventErrorsType = {
  [value: string]: boolean;
};
export type ServerErrorsType = {
  getData: boolean;
  sendData: boolean;
};

export type DateDirection =
  | 'nextMonth'
  | 'previousMonth'
  | 'previousYear'
  | 'nextYear'
  | 'today';
