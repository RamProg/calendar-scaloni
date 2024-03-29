import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';

type ModalWrapperProps = {
  onClose: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  footer,
  onClose,
}) => {
  const { serverErrors } = useEventModal();

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      data-testid="wrapper"
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          data-testid="modal-overlay"
          className="absolute inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        />
      </div>
      <div className="inline-block w-[85%] overflow-hidden text-left align-bottom transition-all transform bg-gray-100 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
        {children}
        <div className="flex flex-row justify-between px-6 py-3">
          {serverErrors.sendData ? (
            <span className="self-center text-red-500">
              Oops.. please try again later
            </span>
          ) : (
            <div />
          )}
          <div className="bg-gray-100 sm:flex sm:flex-row-reverse">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
