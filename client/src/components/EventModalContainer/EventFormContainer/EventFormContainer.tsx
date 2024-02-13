import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import EventForm from './EventForm/EventForm';
import { inputs } from '@/src/constants';

const EventFormContainer: React.FC = () => {
  const { eventData, updateEventData, errors } = useEventModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEventData({ [name]: value });
  };

  return (
    <EventForm
      eventData={eventData}
      onChange={onChange}
      errors={errors}
      inputs={inputs}
    />
  );
};

export default EventFormContainer;
