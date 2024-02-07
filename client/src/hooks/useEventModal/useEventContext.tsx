import { createContext } from 'react';

export const EventModalContext = createContext({
  isOpen: false,
  eventData: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  editOrAdd: 'add',
  onSave: (id?: string) => {},
  openModal: (data?: any) => {},
  closeModal: () => {},
  updateEventData: (data: any) => {},
});
