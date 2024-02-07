import { useContext } from 'react';
import { EventModalContext } from '@/src/contexts/EventModal/EventModalContext';

export const useEventModal = () => useContext(EventModalContext);
