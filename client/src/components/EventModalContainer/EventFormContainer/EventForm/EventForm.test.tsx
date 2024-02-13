import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import EventForm, { EventFormProps } from './EventForm';
import { inputs } from '@/src/constants';

describe('EventForm', () => {
  const mockOnChange = jest.fn();

  const props: EventFormProps = {
    eventData: {
      _id: '1',
      title: 'Test Event',
      description: 'Test Description',
      startDate: '2024-02-02T00:00:00.000Z',
      endDate: '2024-02-02T00:00:00.000Z',
    },
    onChange: mockOnChange,
    errors: {
      title: false,
      description: false,
      startDate: false,
      endDate: false,
    },
    inputs,
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<EventForm {...props} />);
    expect(getByTestId('event-form-container')).toBeInTheDocument();
  });

  it('calls onChange when input values change', () => {
    const { getByLabelText } = render(<EventForm {...props} />);
    fireEvent.change(getByLabelText('Title'), {
      target: { value: 'New Event Name' },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows error when hasError is true', () => {
    const errorProps = {
      ...props,
      errors: {
        ...props.errors,
        title: true,
      },
    };

    const { getByTestId } = render(<EventForm {...errorProps} />);
    expect(getByTestId('error')).toHaveTextContent(
      /There is an issue with the Title/
    );
  });
});
