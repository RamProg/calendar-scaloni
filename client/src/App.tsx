import './App.css';
import MonthlyView from '@/src/components/MonthlyView/MonthlyView';
import EventModal from '@/src/components/EventModal/EventModal';
import { EventModalProvider } from './hooks/useEventModal/useEventProvider';

function App() {
  return (
    <EventModalProvider>
      <MonthlyView />
      <EventModal />
    </EventModalProvider>
  );
}

export default App;
