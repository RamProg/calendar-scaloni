import { ReactNode, useEffect, useState } from 'react';
import { EventModalContext } from './EventModalContext';
import {
  EventErrorsType,
  EventType,
  MonthType,
  ServerErrorsType,
} from '@/src/types';
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

const noServerErrors: ServerErrorsType = {
  getData: false,
  sendData: false,
};

export const EventModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editOrAdd, setEditOrAdd] = useState<'add' | 'edit'>('add');
  const [eventData, setEventData] = useState(emptyEventData);
  const [errors, setErrors] = useState(noErrors);
  const [serverErrors, setServerErrors] =
    useState<ServerErrorsType>(noServerErrors);

  const { addEventMutation, updateEventMutation, deleteEventMutation } =
    useEvents({
      month: currentMonth as MonthType,
      year: currentYear,
    });

  useEffect(() => {
    if (
      addEventMutation.error ||
      updateEventMutation.error ||
      deleteEventMutation.error
    ) {
      setServerErrors((prev) => ({ ...prev, sendData: true }));
    }
  }, [
    addEventMutation.error,
    deleteEventMutation.error,
    updateEventMutation.error,
  ]);

  useEffect(() => {
    if (
      addEventMutation.isSuccess ||
      updateEventMutation.isSuccess ||
      deleteEventMutation.isSuccess
    ) {
      closeModal();
    }
  }, [
    addEventMutation.isSuccess,
    deleteEventMutation.isSuccess,
    updateEventMutation.isSuccess,
  ]);

  const validate = () => {
    const newErrors = {
      title: !isValidText(eventData.title),
      description: !isValidText(eventData.description),
      startDate: !isValidDate(eventData.startDate),
      endDate:
        !isValidDate(eventData.endDate) ||
        eventData.endDate < eventData.startDate,
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
  };

  const closeModal = () => {
    setServerErrors((prev) => ({ ...prev, sendData: false }));
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
        serverErrors,
        setServerErrors,
      }}
    >
      {children}
    </EventModalContext.Provider>
  );
};
