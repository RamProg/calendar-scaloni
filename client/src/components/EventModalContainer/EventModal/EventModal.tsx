import React from 'react';
import ModalWrapper from '@/src/components/common/ModalWrapper/ModalWrapper';
import EventFormContainer from '../EventFormContainer/EventFormContainer';

type EventModalProps = {
  closeModal: () => void;
  footer: React.ReactNode;
};

const EventModal: React.FC<EventModalProps> = ({ closeModal, footer }) => {
  return (
    <ModalWrapper onClose={closeModal} footer={footer}>
      <div
        className="px-4 pt-5 pb-4 bg-gray-100 sm:p-6 sm:pb-4"
        data-testid="event-modal-container"
      >
        <EventFormContainer />
      </div>
    </ModalWrapper>
  );
};

export default EventModal;
