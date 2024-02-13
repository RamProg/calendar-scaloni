import { EventsByDayType, MonthType } from '@/src/types';
import { useEffect, useState } from 'react';
import { EventType } from '@/src/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatEvents } from '@/src/utils/dates/dates';
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
    const response = await axios.get(
      `${SERVER_URL}/events?month=${month}&year=${year}`
    );
    return await response.data;
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
    return await response.data;
  };

  const updateEvent = async (event: EventType): Promise<EventType> => {
    const response = await axios.put(`${SERVER_URL}/event/${event._id}`, event);
    return await response.data;
  };

  const deleteEvent = async (id: string) => {
    const response = await axios.delete(`${SERVER_URL}/event/${id}`);
    return await response.data;
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
      const formattedEvents = formatEvents(fetchEvents.data, month, year);
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
