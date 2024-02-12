import './App.css';
import MonthlyView from '@/src/components/MonthlyView/MonthlyView';
import EventModal from '@/src/components/EventModal/EventModal';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventModalProvider>
        <MonthlyView />
        <EventModal />
      </EventModalProvider>
    </QueryClientProvider>
  );
};

export default App;
