import { isValidText, isValidDate } from './validator';

describe('validator', () => {
  test('isValidText', () => {
    expect(isValidText('')).toBe(false);
    expect(isValidText('            ')).toBe(false);
    expect(isValidText('Hello')).toBe(true);
  });

  test('isValidDate', () => {
    expect(isValidDate('1899-12-31')).toBe(false);
    expect(isValidDate('2201-01-01')).toBe(false);
    expect(isValidDate('2022-01-01')).toBe(true);
    expect(isValidDate('Not a date')).toBe(false);
  });
});
