import {
  CurrentViewedDateContext,
  ViewedDateContextType,
} from '@/src/contexts/CurrentViewedDate/CurrentViewedDateContext/CurrentViewedDateContext';
import { useContext } from 'react';

export const useCurrentViewedDate = (): ViewedDateContextType => {
  const context = useContext(CurrentViewedDateContext);
  if (!context) {
    throw new Error('useCurrentViewedDate must be used within a CurrentViewedDateProvider');
  }
  return context;
};
