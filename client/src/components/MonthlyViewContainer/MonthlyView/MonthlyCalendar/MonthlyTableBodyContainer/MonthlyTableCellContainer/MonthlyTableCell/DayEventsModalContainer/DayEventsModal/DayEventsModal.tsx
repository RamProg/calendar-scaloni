import ModalWrapper from '@/src/components/common/ModalWrapper/ModalWrapper';
import { EventType } from '@/src/types';

type DayEventsModalProps = {
  date: string;
  events: EventType[];
  onClose: () => void;
  footer: React.ReactNode;
  openEventModal: (event: EventType) => void;
};

const DayEventsModal: React.FC<DayEventsModalProps> = ({
  footer,
  openEventModal,
  events,
  onClose,
  date,
}) => {
  return (
    <ModalWrapper onClose={onClose} footer={footer}>
      <div className="px-4 pt-5 pb-4 bg-gray-100 sm:p-6 sm:pb-4">
        <h3 className="text-2xl font-medium leading-6 text-gray-900">
          Events on {date}
        </h3>
        <ul className="mt-3 text-base text-gray-800">
          {events.map((event: EventType, index: number) => (
            <li
              key={event.title + index}
              className="py-1 text-xl hover:cursor-pointer"
              onClick={() => openEventModal(event)}
            >
              {event.title}
            </li>
          ))}
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default DayEventsModal;
