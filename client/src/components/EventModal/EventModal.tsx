import React from 'react';
import Button from '@/src/components/Button/Button';
import EventForm from './EventForm/EventForm';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';

const EventModal: React.FC = () => {
  const createOrEdit = 'create';
  const { isOpen, closeModal, onSave } = useEventModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        />
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-gray-100 sm:p-6 sm:pb-4">
            <EventForm />
          </div>
          <div className="px-4 py-3 bg-gray-100 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              onClick={() => onSave()}
              label={createOrEdit === 'create' ? 'Create' : 'Save'}
              styles="ml-2"
            />
            <Button onClick={closeModal} label="Close" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
