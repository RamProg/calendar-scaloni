import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button.tsx';

describe('Button', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Button label="Test Button" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct label', () => {
    render(<Button label="Test Button" />);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct styleType for secondary buttons', () => {
    render(<Button label="Test Button" styleType="primary" />);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass(
      'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 border-gray-500'
    );
  });

  it('applies the correct styleType for secondary buttons', () => {
    render(<Button label="Test Button" styleType="secondary" />);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass(
      'bg-blue-200 hover:bg-blue-300 active:bg-blue-400 border-blue-500'
    );
  });

  it('applies the correct styleType for tertiary buttons', () => {
    render(<Button label="Test Button" styleType="tertiary" />);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass(
      'bg-red-200 hover:bg-red-300 active:bg-red-400 border-red-500'
    );
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Test Button" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/test button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
