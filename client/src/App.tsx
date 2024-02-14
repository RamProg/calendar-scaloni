import './App.css';
import EventModalContainer from '@/src/components/EventModalContainer/EventModalContainer';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider/EventModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyViewContainer from '@/src/components/MonthlyViewContainer/MonthlyViewContainer';
import { CurrentViewedDateProvider } from './contexts/CurrentViewedDate/CurrentViewedDateProvider/CurrentViewedDateProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentViewedDateProvider>
        <EventModalProvider>
          <MonthlyViewContainer />
          <EventModalContainer />
        </EventModalProvider>
      </CurrentViewedDateProvider>
    </QueryClientProvider>
  );
};

export default App;
