import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import EventForm from './EventForm/EventForm';

const inputs = [
  { type: 'text', name: 'title', label: 'Title' },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'date', name: 'startDate', label: 'Start Date' },
  { type: 'date', name: 'endDate', label: 'End Date' },
];

const EventFormContainer: React.FC = () => {
  const { eventData, updateEventData, errors } = useEventModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEventData({ [name]: value });
  };

  return (
    <EventForm eventData={eventData} onChange={onChange} errors={errors} inputs={inputs}/>
  );
};

export default EventFormContainer;
