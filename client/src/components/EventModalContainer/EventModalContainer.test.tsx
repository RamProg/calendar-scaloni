import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import EventModalContainer from './EventModalContainer';

jest.mock('@/src/hooks/useEventModal/useEventModal');

describe('EventModalContainer', () => {
  const mockCloseModal = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnDelete = jest.fn();
  const mockEditOrAdd = jest.fn();

  beforeEach(() => {
    (useEventModal as jest.Mock).mockReturnValue({
      isOpen: true,
      closeModal: mockCloseModal,
      onSave: mockOnSave,
      onDelete: mockOnDelete,
      editOrAdd: mockEditOrAdd,
      eventData: { _id: 'testId' },
      serverErrors: {
        getData: false,
        sendData: false,
      },
      errors: {
        title: false,
        description: false,
        startDate: false,
        endDate: false,
      },
    });
  });

  it('renders correctly when isOpen is true', () => {
    const { getByTestId } = render(<EventModalContainer />);
    expect(getByTestId('event-modal-container')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    (useEventModal as jest.Mock).mockReturnValue({
      ...useEventModal(),
      isOpen: false,
    });

    const { queryByTestId } = render(<EventModalContainer />);
    expect(queryByTestId('event-modal-container')).not.toBeInTheDocument();
  });
});
