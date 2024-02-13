import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MonthlyNavBar from './MonthlyNavBar';

describe('MonthlyNavBar', () => {
  const mockProps = {
    openModal: jest.fn(),
    serverErrors: { getData: false },
    monthString: 'January',
    year: 2024,
    onChangeDate: jest.fn((newDateDirection) => {
      if (newDateDirection === 'nextMonth') {
        mockProps.monthString = 'February';
        mockProps.year = 2024;
      }
      if (newDateDirection === 'previousMonth') {
        mockProps.monthString = 'December';
        mockProps.year = 2023;
      }
    }),
  };
  it('renders the current month and year', () => {
    const { getByRole } = render(<MonthlyNavBar {...mockProps} />);
    const monthDisplay = getByRole('heading', {
      name: `${mockProps.monthString} ${mockProps.year}`,
    });
    expect(monthDisplay).toBeInTheDocument();
  });

  it('navigates to the next month', async () => {
    const { getByRole, findByRole, rerender } = render(
      <MonthlyNavBar {...mockProps} />
    );
    const nextButton = getByRole('button', { name: '>' });

    fireEvent.click(nextButton);

    rerender(<MonthlyNavBar {...mockProps} />);

    const monthDisplay = await findByRole('heading', {
      name: 'February 2024',
    });
    expect(monthDisplay).toBeInTheDocument();
  });

  it('navigates to the previous month', async () => {
    const { getByRole, findByRole, rerender } = render(
      <MonthlyNavBar {...mockProps} />
    );
    const nextButton = getByRole('button', { name: '<' });

    fireEvent.click(nextButton);

    rerender(<MonthlyNavBar {...mockProps} />);

    const monthDisplay = await findByRole('heading', {
      name: 'December 2023',
    });
    expect(monthDisplay).toBeInTheDocument();
  });

  it('navigates to today when Today button is clicked', () => {
    const { getByRole } = render(<MonthlyNavBar {...mockProps} />);
    const todayButton = getByRole('button', { name: 'Today' });

    fireEvent.click(todayButton);

    expect(mockProps.onChangeDate).toHaveBeenCalledWith('today');
  });

  it('opens the modal when New button is clicked', () => {
    const { getByRole, rerender } = render(<MonthlyNavBar {...mockProps} />);
    const newButton = getByRole('button', { name: 'New' });

    fireEvent.click(newButton);

    rerender(<MonthlyNavBar {...mockProps} />);

    expect(mockProps.openModal).toHaveBeenCalled();
  });

  it('navigates to the previous year when << button is clicked', () => {
    const { getByRole } = render(<MonthlyNavBar {...mockProps} />);
    const prevYearButton = getByRole('button', { name: '<<' });

    fireEvent.click(prevYearButton);

    expect(mockProps.onChangeDate).toHaveBeenCalledWith('previousYear');
  });

  it('navigates to the next year when >> button is clicked', () => {
    const { getByRole } = render(<MonthlyNavBar {...mockProps} />);
    const nextYearButton = getByRole('button', { name: '>>' });

    fireEvent.click(nextYearButton);

    expect(mockProps.onChangeDate).toHaveBeenCalledWith('nextYear');
  });

  it('displays server error message when serverErrors.getData is true', () => {
    mockProps.serverErrors.getData = true;
    const { getByText } = render(<MonthlyNavBar {...mockProps} />);

    const errorMessage = getByText(
      'There was an issue connecting to the server...'
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
