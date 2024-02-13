import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ModalWrapper from './ModalWrapper';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';

jest.mock('@/src/hooks/useEventModal/useEventModal', () => ({
  useEventModal: jest.fn().mockReturnValue({
    serverErrors: { sendData: false },
  }),
}));

describe('ModalWrapper', () => {
  const mockOnClose = jest.fn();
  describe('props', () => {
    beforeEach(() => {
      render(
        <ModalWrapper onClose={mockOnClose} footer={<div>Footer content</div>}>
          <p>Modal content</p>
        </ModalWrapper>
      );
    });
    it('renders correctly', () => {
      const modalElement = screen.getByText('Modal content');
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toMatchSnapshot();
    });

    it('calls onClose prop when modal overlay is clicked', () => {
      const modalOverlay = screen.getByTestId(/modal-overlay/i);
      fireEvent.click(modalOverlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('renders footer correctly', () => {
      const footerElement = screen.getByText('Footer content');
      expect(footerElement).toBeInTheDocument();
    });
  });

  describe('error states', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders error message when serverErrors.sendData is true', () => {
      // Mock the serverErrors.sendData condition
      (useEventModal as jest.Mock).mockReturnValue({
        serverErrors: { sendData: true },
      });

      render(
        <ModalWrapper onClose={mockOnClose} footer={<div>Footer content</div>}>
          <p>Modal content</p>
        </ModalWrapper>
      );

      const errorMessage = screen.getByText(/Oops.. please try again later/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it('does not render error message when serverErrors.sendData is false', () => {
      // Mock the serverErrors.sendData condition
      (useEventModal as jest.Mock).mockReturnValue({
        serverErrors: { sendData: false },
      });

      render(
        <ModalWrapper onClose={mockOnClose} footer={<div>Footer content</div>}>
          <p>Modal content</p>
        </ModalWrapper>
      );

      const errorMessage = screen.queryByText('Oops.. please try again later');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
