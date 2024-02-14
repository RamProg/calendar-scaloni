import './App.css';
import EventModalContainer from '@/src/components/EventModalContainer/EventModalContainer';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider/EventModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrentViewedDateProvider } from './contexts/CurrentViewedDate/CurrentViewedDateProvider/CurrentViewedDateProvider';
import MonthlyView from './components/MonthlyView/MonthlyView';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentViewedDateProvider>
        <EventModalProvider>
          <MonthlyView />
          <EventModalContainer />
        </EventModalProvider>
      </CurrentViewedDateProvider>
    </QueryClientProvider>
  );
};

export default App;
