import './App.css';
import MonthlyView from '@/src/components/MonthlyView/MonthlyView';
import EventModalContainer from '@/src/components/EventModalContainer/EventModalContainer';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventModalProvider>
        <MonthlyView />
        <EventModalContainer />
      </EventModalProvider>
    </QueryClientProvider>
  );
};

export default App;
