import Button from '@/src/components/common/Button/Button';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import DayEventsModal from './DayEventsModal/DayEventsModal';
import { useCurrentViewedDate } from '@/src/hooks/useCurrentViewedDate/useCurrentViewedDate';
import { getMonthName } from '@/src/utils/dates/dates';

type DayEventsModalContainerProps = {
  day: string;
  events: EventType[];
  onClose: () => void;
};

const DayEventsModalContainer: React.FC<DayEventsModalContainerProps> = ({
  day,
  events,
  onClose,
}) => {
  const { openModal } = useEventModal();
  const { month, year } = useCurrentViewedDate();
  
  const date = `${day} ${getMonthName(month)} ${year}`;

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
