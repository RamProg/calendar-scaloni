import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const mockOnChange = jest.fn();
  const inputLabel = 'Test Input';

  test('renders correctly', () => {
    render(
      <Input
        label={inputLabel}
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        hasError={false}
      />
    );
    const inputElement = screen.getByLabelText(inputLabel);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toMatchSnapshot();
  });

  test('calls onChange prop when text is entered', () => {
    render(
      <Input
        label={inputLabel}
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        hasError={false}
      />
    );

    const inputElement = screen.getByLabelText(inputLabel);

    fireEvent.change(inputElement, { target: { value: 'test value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('shows error state when hasError prop is true', () => {
    render(
      <Input
        label={inputLabel}
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        hasError={true}
      />
    );
    const errorElement = screen.getByText(
      `There is an issue with the ${inputLabel}`
    );
    expect(errorElement).toBeInTheDocument();
  });
});
