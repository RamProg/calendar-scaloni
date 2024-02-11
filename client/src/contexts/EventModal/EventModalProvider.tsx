import { ReactNode, useState } from 'react';
import { EventModalContext } from './EventModalContext';
import { EventErrorsType, EventType, MonthType } from '@/src/types';
import useEvents from '@/src/hooks/useEvents/useEvents';
import { isValidText, isValidDate } from '@/src/utils/validator';
import { currentMonth, currentYear } from '@/src/utils/dates';

const emptyEventData: EventType = {
  _id: '',
  title: '',
  description: '',
  startDate: '',
  endDate: '',
};

const noErrors: EventErrorsType = {
  title: false,
  description: false,
  startDate: false,
  endDate: false,
};

export const EventModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editOrAdd, setEditOrAdd] = useState<'add' | 'edit'>('add');
  const [eventData, setEventData] = useState(emptyEventData);
  const [errors, setErrors] = useState(noErrors);

  const { addEventMutation, updateEventMutation, deleteEventMutation } =
    useEvents({
      month: currentMonth as MonthType,
      year: currentYear,
    });

  const validate = () => {
    const newErrors = {
      title: !isValidText(eventData.title),
      description: !isValidText(eventData.description),
      startDate: !isValidDate(eventData.startDate),
      endDate: !isValidDate(eventData.endDate),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const onSave = (id?: string) => {
    const isValid = validate();

    if (!isValid) return;

    const data = {
      ...eventData,
      startDate: new Date(eventData.startDate).toISOString(),
      endDate: new Date(eventData.endDate).toISOString(),
    };

    if (id) {
      updateEventMutation.mutate(data);
    } else {
      addEventMutation.mutate(data);
    }
    closeModal();
  };

  const updateEventData = (data: Partial<EventType>) => {
    setErrors(noErrors);
    setEventData((prev) => ({ ...prev, ...data }));
  };

  const openModal = (data?: EventType) => {
    if (!data) {
      setEditOrAdd('add');
      setEventData(emptyEventData);
    } else {
      setEditOrAdd('edit');
      updateEventData({
        ...data,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    }
    setIsOpen(true);
  };

  const onDelete = (id: string) => {
    deleteEventMutation.mutate(id);
    closeModal();
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
        onDelete,
        errors,
      }}
    >
      {children}
    </EventModalContext.Provider>
  );
};
