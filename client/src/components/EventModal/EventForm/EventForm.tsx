import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import Input from '@/src/components/Input/Input';

const inputs = [
  { type: 'text', name: 'title', label: 'Title' },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'date', name: 'startDate', label: 'Start Date' },
  { type: 'date', name: 'endDate', label: 'End Date' },
];

const EventForm = () => {
  const { eventData, updateEventData, errors } = useEventModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEventData({ [name]: value });
  };

  return (
    <form id="event-form">
      {inputs.map((input) => (
        <Input
          key={input.name}
          type={input.type}
          name={input.name}
          label={input.label}
          value={eventData[input.name as keyof typeof eventData]}
          onChange={onChange}
          hasError={errors[input.name]}
        />
      ))}
    </form>
  );
};

export default EventForm;
