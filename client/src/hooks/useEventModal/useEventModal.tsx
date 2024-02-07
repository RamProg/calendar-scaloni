import { useContext } from 'react';
import { EventModalContext } from './useEventContext';

export const useEventModal = () => useContext(EventModalContext);
