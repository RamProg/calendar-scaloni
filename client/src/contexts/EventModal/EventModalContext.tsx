import { EventType } from '@/src/types';
import { createContext } from 'react';

type EventModalContextType = {
  isOpen: boolean;
  eventData: EventType;
  editOrAdd: 'add' | 'edit';
  onSave: (id?: string) => void;
  openModal: (data?: EventType) => void;
  closeModal: () => void;
  updateEventData: (data: Partial<EventType>) => void;
};

const defaultContextValue: EventModalContextType = {
  isOpen: false,
  eventData: {
    id: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  editOrAdd: 'add',
  onSave: () => {},
  openModal: () => {},
  closeModal: () => {},
  updateEventData: () => {},
};

export const EventModalContext = createContext(defaultContextValue);
