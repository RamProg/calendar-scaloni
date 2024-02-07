import { MonthType } from '@/src/types';
import { useCallback, useEffect, useState } from 'react';
import { EventType } from '@/src/types';

type useEventsProps = {
  month: MonthType;
  year: number;
};

type EventsByDayType = {
  [day: string]: EventType[];
};

const tasksLocal: EventType[] = [
  {
    id: '1',
    title: 'Interview with Factorial',
    description: 'Interview for the software engineer position',
    startDate: '2024-02-01',
    endDate: '2024-02-04',
  },
  {
    id: '2',
    title: 'Holidays',
    description: 'Winter holidays',
    startDate: '2024-02-03',
    endDate: '2024-02-04',
  },
  {
    id: '3',
    title: 'Traveling to Barcelona',
    description: 'Summer vacation in Barcelona',
    startDate: '2024-02-05',
    endDate: '2024-02-06',
  },
  {
    id: '4',
    title: 'Interview with Factorial',
    description: 'Second interview for the software engineer position',
    startDate: '2024-02-07',
    endDate: '2024-02-08',
  },
  {
    id: '5',
    title: 'Holidays',
    description: 'Spring holidays',
    startDate: '2024-02-09',
    endDate: '2024-02-10',
  },
  {
    id: '6',
    title: 'Traveling to Barcelona',
    description: 'Second summer vacation in Barcelona',
    startDate: '2024-02-11',
    endDate: '2024-02-12',
  },
  {
    id: '7',
    title: 'Visiting Grandma',
    description: 'its her birthday!',
    startDate: '2024-02-09',
    endDate: '2024-02-13',
  },
  {
    id: '8',
    title: 'Studying for exams',
    description: 'gonna be tough one',
    startDate: '2024-02-08',
    endDate: '2024-02-14',
  },
  {
    id: '9',
    title: 'Organising the apartment',
    description: 'Cleaning and putting stuff in place',
    startDate: '2024-02-10',
    endDate: '2024-02-16',
  },
];

const useEvents = ({ month, year }: useEventsProps) => {
  const [monthlyEventsByDay, setMonthlyEventsByDay] = useState<EventsByDayType>(
    {}
  );

  const getEvents = useCallback(async (): Promise<EventType[]> => {
    // const response = await fetch(
    //   `http://localhost:4000/tasks?month=${month}&year=${year}`
    // );
    // const data = await response.json();
    const data = await tasksLocal;
    return data;
  }, [month, year]);

  const formatEvents = (events: EventType[]): EventsByDayType => {
    const eventsByDay: EventsByDayType = {};

    events.forEach((event) => {
      const startDate = Number(event.startDate.split('-')[2]);
      const endDate = Number(event.endDate.split('-')[2]);

      for (let i = startDate; i <= endDate; i++) {
        if (!eventsByDay[i]) {
          eventsByDay[i] = [];
        }

        eventsByDay[i].push(event);
      }
    });
    return eventsByDay;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setMonthlyEventsByDay(formatEvents(events));
    };

    fetchEvents();
  }, [getEvents, month, year]);

  return { monthlyEventsByDay };
};

export default useEvents;
