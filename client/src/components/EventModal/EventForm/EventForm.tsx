import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';

const EventForm = () => {
  const { eventData, updateEventData } = useEventModal();
  const { title, description, startDate, endDate } = eventData;

  return (
    <form>
      <label className="block">
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => updateEventData({ title: e.target.value })}
          className="block w-full mt-1"
        />
      </label>
      <label className="block mt-4">
        Description
        <textarea
          value={description}
          onChange={(e) => updateEventData({ description: e.target.value })}
          className="block w-full mt-1"
        />
      </label>
      <label className="block mt-4">
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(e) => updateEventData({ startDate: e.target.value })}
          className="block w-full mt-1"
        />
      </label>
      <label className="block mt-4">
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => updateEventData({ endDate: e.target.value })}
          className="block w-full mt-1"
        />
      </label>
    </form>
  );
};

export default EventForm;
