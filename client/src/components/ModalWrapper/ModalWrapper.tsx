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
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        />
      </div>
      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-gray-100 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        {children}
        <div className="px-4 py-3 bg-gray-100 sm:px-6 sm:flex sm:flex-row-reverse">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
