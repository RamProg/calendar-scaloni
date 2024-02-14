import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import DayEventsModalContainer from './DayEventsModalContainer';
import { mockedEvents } from '@/src/mocks';

jest.mock('@/src/hooks/useEventModal/useEventModal');

describe('DayEventsModalContainer', () => {
  const mockOnClose = jest.fn();
  const mockOpenModal = jest.fn();

  beforeEach(() => {
    (useEventModal as jest.Mock).mockReturnValue({
      openModal: mockOpenModal,
      serverErrors: { sendData: false },
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <DayEventsModalContainer
        date="2 February 2024"
        events={mockedEvents}
        onClose={mockOnClose}
      />
    );

    expect(getByText(mockedEvents[0].title)).toBeInTheDocument();
    expect(getByText(mockedEvents[1].title)).toBeInTheDocument();
  });

  it('calls onClose and openModal when an event is clicked', () => {
    const { getByText } = render(
      <DayEventsModalContainer
        date="2 February 2024"
        events={mockedEvents}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(getByText(mockedEvents[0].title));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOpenModal).toHaveBeenCalledWith(mockedEvents[0]);
  });
});
