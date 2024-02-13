import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import EventFormContainer from './EventFormContainer';

jest.mock('@/src/hooks/useEventModal/useEventModal');

describe('EventFormContainer', () => {
  const mockUpdateEventData = jest.fn();

  beforeEach(() => {
    (useEventModal as jest.Mock).mockReturnValue({
      eventData: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      },
      updateEventData: mockUpdateEventData,
      errors: {},
    });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<EventFormContainer />);
    expect(getByTestId('event-form-container')).toBeInTheDocument();
  });

  it('calls updateEventData when input values change', () => {
    const { getByLabelText } = render(<EventFormContainer />);
    fireEvent.change(getByLabelText('Title'), {
      target: { value: 'New Title' },
    });
    expect(mockUpdateEventData).toHaveBeenCalled();
  });
});
