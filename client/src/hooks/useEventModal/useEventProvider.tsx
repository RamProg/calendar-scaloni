import { ReactNode, useState } from 'react';
import { EventModalContext } from './useEventContext';
import { EventType } from '@/src/types';

const emptyEventData = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
};

export const EventModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState('add');
  const [eventData, setEventData] = useState(emptyEventData);

  const onSave = (id?: string) => {
    if (id) {
      // update event
    } else {
      // create event
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
