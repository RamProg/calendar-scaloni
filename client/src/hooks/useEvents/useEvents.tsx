import { EventsByDayType, MonthType } from '@/src/types';
import { useEffect, useState } from 'react';
import { EventType } from '@/src/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatEvents } from '@/src/utils/dates';
import { SERVER_URL } from '@/src/constants';
import { useEventModal } from '../useEventModal/useEventModal';
import axios from 'axios';

type useEventsProps = {
  month: MonthType;
  year: number;
};

const useEvents = ({ month, year }: useEventsProps) => {
  const [monthlyEventsByDay, setMonthlyEventsByDay] = useState<EventsByDayType>(
    {}
  );
  const { setServerErrors } = useEventModal();

  const getEvents = async (): Promise<EventType[]> => {
    console.log('fetching events');
    const response = await axios.get(
      `${SERVER_URL}/events?month=${month}&year=${year}`
    );
    console.log('events fetched');

    console.log('response ok');

    const data = await response.data;
    console.log('there is data', data);
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
    const response = await axios.post(`${SERVER_URL}/event`, event);
    const data = await response.data;
    return data;
  };

  const updateEvent = async (event: EventType): Promise<EventType> => {
    console.log('updating event');
    const response = await axios.put(`${SERVER_URL}/event/${event._id}`, event);
    console.log('event updated');
    const data = await response.data;
    console.log('data', data);
    return data;
  };

  const deleteEvent = async (id: string) => {
    const response = await axios.delete(`${SERVER_URL}/event/${id}`);
    const data = await response.data;
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
    console.log('entre al use effect');
    console.log('fetchEvents.data', fetchEvents.data);
    if (fetchEvents.data) {
      const formattedEvents = formatEvents(fetchEvents.data, month, year);
      console.log('formattedEvents', formattedEvents);
      setMonthlyEventsByDay(formattedEvents);
    }
  }, [fetchEvents.data, month, year]);

  return {
    fetchEvents,
    monthlyEventsByDay,
    addEventMutation,
    updateEventMutation,
    deleteEventMutation,
  };
};

export default useEvents;
