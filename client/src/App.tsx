import './App.css';
import EventModalContainer from '@/src/components/EventModalContainer/EventModalContainer';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyViewContainer from '@/src/components/MonthlyViewContainer/MonthlyViewContainer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventModalProvider>
        <MonthlyViewContainer />
        <EventModalContainer />
      </EventModalProvider>
    </QueryClientProvider>
  );
};

export default App;
