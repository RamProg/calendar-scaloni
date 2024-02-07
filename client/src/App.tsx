import './App.css';
import MonthlyView from '@/src/components/MonthlyView/MonthlyView';
import EventModal from '@/src/components/EventModal/EventModal';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider';

function App() {
  return (
    <EventModalProvider>
      <MonthlyView />
      <EventModal />
    </EventModalProvider>
  );
}

export default App;
