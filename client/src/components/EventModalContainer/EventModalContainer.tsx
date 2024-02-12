import React from 'react';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import EventModal from './EventModal/EventModal';
import Footer from './Footer/Footer';

const EventModalContainer: React.FC = () => {
  const { isOpen, closeModal, onSave, onDelete, editOrAdd } = useEventModal();
  const { eventData } = useEventModal();
  const { _id } = eventData;

  const footer = (
    <Footer
      onSave={onSave}
      onDelete={onDelete}
      closeModal={closeModal}
      _id={_id}
      editOrAdd={editOrAdd}
    />
  );

  if (!isOpen) return null;

  return (
    <EventModal
      closeModal={closeModal}
      footer={footer}
    />
  );
};

export default EventModalContainer;
