import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { daysOfTheWeek } from '@/src/constants';
import MonthlyTableHeader from './MonthlyTableHeader';

describe('MonthlyTableHeader', () => {
  it('renders correct number of th elements', () => {
    const { getAllByRole } = render(<MonthlyTableHeader />);
    const thElements = getAllByRole('columnheader');
    expect(thElements).toHaveLength(daysOfTheWeek.length);
  });

  it('renders th elements with correct text', () => {
    const { getAllByRole } = render(<MonthlyTableHeader />);
    const thElements = getAllByRole('columnheader');
    thElements.forEach((th, index) => {
      expect(th.textContent).toBe(daysOfTheWeek[index].substring(0, 3));
    });
  });
});
