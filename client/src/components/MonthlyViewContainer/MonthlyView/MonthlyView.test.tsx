import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyView from './MonthlyView';

describe('MonthlyView', () => {
  const month = 2;
  const year = 2024;
  const onChangeDate = jest.fn();
  const queryClient = new QueryClient();

  it('renders correctly', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyView month={month} year={year} onChangeDate={onChangeDate} />
      </QueryClientProvider>
    );

    expect(getByText(/February 2024/i)).toBeInTheDocument();
  });

  it('calls onChangeDate when date is changed', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyView month={month} year={year} onChangeDate={onChangeDate} />
      </QueryClientProvider>
    );

    fireEvent.click(getByText('>'));
    expect(onChangeDate).toHaveBeenCalledWith('nextMonth');
  });
});
