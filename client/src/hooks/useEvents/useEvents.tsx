import { EventsByDayType, MonthType } from '@/src/types';
import { useEffect, useState } from 'react';
import { EventType } from '@/src/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatEvents } from '@/src/utils/dates';
import { SERVER_URL } from '@/src/constants';
import { useEventModal } from '../useEventModal/useEventModal';

type useEventsProps = {
  month: MonthType;
  year: number;
};

// const tasksLocal: EventType[] = [
//   {
//     id: '1',
//     title: 'Interview with Factorial',
//     description: 'Interview for the software engineer position',
//     startDate: '2024-02-01',
//     endDate: '2024-02-04',
//   },
//   {
//     id: '2',
//     title: 'Holidays',
//     description: 'Winter holidays',
//     startDate: '2024-02-03',
//     endDate: '2024-02-04',
//   },
//   {
//     id: '3',
//     title: 'Traveling to Barcelona',
//     description: 'Summer vacation in Barcelona',
//     startDate: '2024-02-05',
//     endDate: '2024-02-06',
//   },
//   {
//     id: '4',
//     title: 'Interview with Factorial',
//     description: 'Second interview for the software engineer position',
//     startDate: '2024-02-07',
//     endDate: '2024-02-08',
//   },
//   {
//     id: '5',
//     title: 'Holidays',
//     description: 'Spring holidays',
//     startDate: '2024-02-09',
//     endDate: '2024-02-10',
//   },
//   {
//     id: '6',
//     title: 'Traveling to Barcelona',
//     description: 'Second summer vacation in Barcelona',
//     startDate: '2024-02-11',
//     endDate: '2024-02-12',
//   },
//   {
//     id: '7',
//     title: 'Visiting Grandma',
//     description: 'its her birthday!',
//     startDate: '2024-02-09',
//     endDate: '2024-02-13',
//   },
//   {
//     id: '8',
//     title: 'Studying for exams',
//     description: 'gonna be tough one',
//     startDate: '2024-02-08',
//     endDate: '2024-02-14',
//   },
//   {
//     id: '9',
//     title: 'Organising the apartment',
//     description: 'Cleaning and putting stuff in place',
//     startDate: '2024-02-10',
//     endDate: '2024-02-16',
//   },
// ];

const useEvents = ({ month, year }: useEventsProps) => {
  const [monthlyEventsByDay, setMonthlyEventsByDay] = useState<EventsByDayType>(
    {}
  );
  const { setServerErrors } = useEventModal();

  const getEvents = async (): Promise<EventType[]> => {
    const response = await fetch(
      `${SERVER_URL}/events?month=${month}&year=${year}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get monthly events: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  };

  const fetchEvents = useQuery({
    queryKey: ['fetchEvents', month, year],
    queryFn: getEvents,
    meta: { errorMessage: 'Failed to fetch events' },
  });

  useEffect(() => {
    if (fetchEvents.error) {
      setServerErrors((prev) => ({ ...prev, getData: true }));
    } else {
      setServerErrors((prev) => ({ ...prev, getData: false }));
    }
  }, [fetchEvents.error, setServerErrors]);

  const addEvent = async (event: EventType): Promise<EventType> => {
    const response = await fetch(SERVER_URL + '/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add event: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  };

  const updateEvent = async (event: EventType): Promise<EventType> => {
    const response = await fetch(SERVER_URL + '/event/' + event._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update event: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  };

  const deleteEvent = async (id: string) => {
    const response = await fetch(SERVER_URL + '/event/' + id, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add event: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  };

  const onSuccess = () => {
    fetchEvents.refetch();
  };

  const onError = (error: Error) => {
    console.error('error', error);
  };

  const addEventMutation = useMutation({
    mutationFn: (newEvent: EventType) => addEvent(newEvent),
    onSuccess,
    onError,
  });

  const updateEventMutation = useMutation({
    mutationFn: (newEvent: EventType) => updateEvent(newEvent),
    onSuccess,
    onError,
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (fetchEvents.data) {
      setMonthlyEventsByDay(formatEvents(fetchEvents.data, month, year));
    }
  }, [fetchEvents.data, month, year]);

  return {
    monthlyEventsByDay,
    addEventMutation,
    updateEventMutation,
    deleteEventMutation,
  };
};

export default useEvents;
