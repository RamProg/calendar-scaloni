import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyViewContainer from './MonthlyViewContainer';

describe('MonthlyViewContainer', () => {
  const queryClient = new QueryClient();

  it('changes date to the following month when nextMonth is clicked', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyViewContainer />
      </QueryClientProvider>
    );
    const nextMonthButton = getByText('>');
    fireEvent.click(nextMonthButton);
    const currentDate = new Date();
    const nextMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    const nextMonth = nextMonthDate.toLocaleString('default', {
      month: 'long',
    });
    const regex = new RegExp(nextMonth, 'i');
    expect(getByText(regex)).toBeInTheDocument();
  });

  it('changes date to the previous month when previousMonth is clicked', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyViewContainer />
      </QueryClientProvider>
    );
    const previousMonthButton = getByText('<');
    fireEvent.click(previousMonthButton);
    const currentDate = new Date();
    const previousMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    const previousMonth = previousMonthDate.toLocaleString('default', {
      month: 'long',
    });
    const regex = new RegExp(previousMonth, 'i');
    expect(getByText(regex)).toBeInTheDocument();
  });

  it('changes date to the previous month when previousMonth is clicked', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyViewContainer />
      </QueryClientProvider>
    );
    const previousYearButton = getByText('<<');
    fireEvent.click(previousYearButton);
    const currentDate = new Date();
    const previousYearDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 1)
    );
    const previousYear = previousYearDate.toLocaleString('default', {
      month: 'long',
    });
    const regex = new RegExp(previousYear, 'i');
    expect(getByText(regex)).toBeInTheDocument();
  });

  it('changes date to the following month when nextMonth is clicked', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyViewContainer />
      </QueryClientProvider>
    );
    const nextYearButton = getByText('>>');
    fireEvent.click(nextYearButton);
    const currentDate = new Date();
    const nextYearDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 1)
    );
    const nextYear = nextYearDate.toLocaleString('default', { month: 'long' });
    const regex = new RegExp(nextYear, 'i');
    expect(getByText(regex)).toBeInTheDocument();
  });

  it('changes date to the following month when nextMonth is clicked', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyViewContainer />
      </QueryClientProvider>
    );
    const todayButton = getByText('Today');
    fireEvent.click(todayButton);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
    const currentYear = currentDate.toLocaleString('default', {
      year: 'numeric',
    });
    const monthRegex = new RegExp(currentMonth, 'i');
    const yearRegex = new RegExp(currentYear, 'i');
    expect(getByText(monthRegex)).toBeInTheDocument();
    expect(getByText(yearRegex)).toBeInTheDocument();
  });
});
