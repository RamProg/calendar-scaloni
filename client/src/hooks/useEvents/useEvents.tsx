import { EventsByDayType, MonthType } from '@/src/types';
import { useEffect, useState } from 'react';
import { EventType } from '@/src/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatEvents } from '@/src/utils/dates';
import { SERVER_URL } from '@/src/constants';

type useEventsProps = {
  month: MonthType;
  year: number;
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

  const getEvents = async (): Promise<EventType[]> => {
    const response = await fetch(
      `${SERVER_URL}/events?month=${month}&year=${year}`
    );
    const data = await response.json();
    return data;
  };

  const addEvent = async (event: EventType): Promise<EventType> => {
    console.log('event', event);
    const response = await fetch(SERVER_URL + '/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    console.log('response', response);
    console.log('error', response.status);

    const data = await response.json();
    return data;
  };

  const fetchEvents = useQuery({
    queryKey: ['fetchEvents', month, year],
    queryFn: getEvents,
  });

  const addEventMutation = useMutation({
    mutationFn: (newEvent: EventType) => addEvent(newEvent),
    onSuccess: () => {
      fetchEvents.refetch();
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {
    if (fetchEvents.data) {
      setMonthlyEventsByDay(formatEvents(fetchEvents.data));
    }
  }, [fetchEvents.data]);

  return { monthlyEventsByDay, addEventMutation };
};

export default useEvents;
