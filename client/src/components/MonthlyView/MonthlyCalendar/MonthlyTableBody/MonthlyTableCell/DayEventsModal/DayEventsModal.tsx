import Button from '@/src/components/Button/Button';
import { EventType } from '@/src/types';

type DayEventsModalProps = {
  date: string;
  events: EventType[];
  onClose: () => void;
};

const DayEventsModal: React.FC<DayEventsModalProps> = ({
  date,
  events,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>
      </div>

      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-gray-100 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 bg-gray-100 sm:p-6 sm:pb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Events on {date}
          </h3>
          <ul className="mt-3 text-base text-gray-800">
            {events.map((event: EventType, index: number) => (
              <li key={event.title + index} className="py-1">
                {event.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-3 bg-gray-100 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DayEventsModal;
