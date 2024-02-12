import { EventErrorsType, EventType, ServerErrorsType } from '@/src/types';
import { createContext } from 'react';

type EventModalContextType = {
  isOpen: boolean;
  eventData: EventType;
  editOrAdd: 'add' | 'edit';
  onSave: (id?: string) => void;
  openModal: (data?: EventType) => void;
  closeModal: () => void;
  onDelete: (id: string) => void;
  errors: EventErrorsType;
  serverErrors: ServerErrorsType;
  setServerErrors: React.Dispatch<React.SetStateAction<ServerErrorsType>>
  updateEventData: (data: Partial<EventType>) => void;
};

const defaultContextValue: EventModalContextType = {
  isOpen: false,
  eventData: {
    _id: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  editOrAdd: 'add',
  onSave: () => {},
  openModal: () => {},
  closeModal: () => {},
  onDelete: () => {},
  errors: {
    title: false,
    description: false,
    startDate: false,
    endDate: false,
  },
  serverErrors: {
    getData: false,
    sendData: false,
  },
  setServerErrors: () => {},
  updateEventData: () => {},
};

export const EventModalContext = createContext(defaultContextValue);
