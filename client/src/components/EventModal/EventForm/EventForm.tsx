import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import Input from '@/src/components/Input/Input';

const EventForm = () => {
  const { eventData, updateEventData, errors } = useEventModal();
  const { title, description, startDate, endDate } = eventData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEventData({ [name]: value });
  };

  return (
    <form id="event-form">
      <Input
        type="text"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        hasError={errors.title}
      />
      <Input
        type="text"
        name="description"
        label="Description"
        value={description}
        onChange={onChange}
        hasError={errors.description}
      />
      <Input
        type="date"
        name="startDate"
        label="Start Date"
        value={startDate}
        onChange={onChange}
        hasError={errors.startDate}
      />
      <Input
        type="date"
        name="endDate"
        label="End Date"
        value={endDate}
        onChange={onChange}
        hasError={errors.endDate}
      />
    </form>
  );
};

export default EventForm;
