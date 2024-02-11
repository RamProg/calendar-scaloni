import { ReactNode, useState } from 'react';
import { EventModalContext } from './EventModalContext';
import { EventType } from '@/src/types';
import useEvents from '@/src/hooks/useEvents/useEvents';

const emptyEventData: EventType = {
  id: '',
  title: '',
  description: '',
  startDate: '',
  endDate: '',
};

export const EventModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editOrAdd, setEditOrAdd] = useState<'add' | 'edit'>('add');
  const [eventData, setEventData] = useState(emptyEventData);

  const { addEventMutation } = useEvents({ month: 2, year: 2024 });

  const onSave = (id?: string) => {
    if (id) {
      // update event
    } else {
      addEventMutation.mutate(eventData);
    }
  };

  const updateEventData = (data: Partial<EventType>) => {
    setEventData((prev) => ({ ...prev, ...data }));
  };

  const openModal = (data?: EventType) => {
    if (!data) {
      setEditOrAdd('add');
      setEventData(emptyEventData);
    } else {
      setEditOrAdd('edit');
      updateEventData(data);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <EventModalContext.Provider
      value={{
        isOpen,
        eventData,
        openModal,
        closeModal,
        onSave,
        updateEventData,
        editOrAdd,
      }}
    >
      {children}
    </EventModalContext.Provider>
  );
};
