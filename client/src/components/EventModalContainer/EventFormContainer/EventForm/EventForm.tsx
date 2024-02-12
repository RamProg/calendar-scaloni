import Input from '@/src/components/common/Input/Input';
import { EventErrorsType, EventType } from '@/src/types';

type EventFormProps = {
  eventData: EventType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: EventErrorsType;
  inputs: { type: string; name: string; label: string }[];
};

const EventForm: React.FC<EventFormProps> = ({
  eventData,
  onChange,
  errors,
  inputs,
}) => {
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
