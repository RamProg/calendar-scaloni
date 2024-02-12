import Button from '@/src/components/common/Button/Button';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import DayEventsModal from './DayEventsModal/DayEventsModal';

type DayEventsModalContainerProps = {
  date: string;
  events: EventType[];
  onClose: () => void;
};

const DayEventsModalContainer: React.FC<DayEventsModalContainerProps> = ({
  date,
  events,
  onClose,
}) => {
  const { openModal } = useEventModal();

  const openEventModal = (event: EventType) => {
    onClose();
    openModal(event);
  };

  const footer: React.ReactNode = (
    <Button label="Close" onClick={onClose} big={true} />
  );

  return (
    <DayEventsModal
      date={date}
      events={events}
      onClose={onClose}
      footer={footer}
      openEventModal={openEventModal}
    />
  );
};

export default DayEventsModalContainer;
