import React from 'react';
import Button from '@/src/components/Button/Button';
import EventForm from './EventForm/EventForm';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { isMobile } from 'react-device-detect';

const EventModal: React.FC = () => {
  const { isOpen, closeModal, onSave, onDelete, editOrAdd } = useEventModal();
  const { eventData } = useEventModal();
  const { _id } = eventData;

  if (!isOpen) return null;

  const footer: React.ReactNode = (
    <>
      <Button
        styleType="secondary"
        onClick={() => onSave(_id)}
        label={editOrAdd === 'add' ? 'Create' : 'Save'}
        big={true}
        styles={isMobile ? 'mr-2' : 'ml-2'}
      />
      {editOrAdd === 'edit' && (
        <Button
          styleType="tertiary"
          onClick={() => onDelete(_id)}
          label={'Delete'}
          big={true}
          styles={isMobile ? 'mr-2' : 'ml-2'}
        />
      )}
      <Button onClick={closeModal} big={true} label="Close" />
    </>
  );

  return (
    <ModalWrapper onClose={closeModal} footer={footer}>
      <div className="px-4 pt-5 pb-4 bg-gray-100 sm:p-6 sm:pb-4">
        <EventForm />
      </div>
    </ModalWrapper>
  );
};

export default EventModal;
