import { useContext } from 'react';
import { useEventModal } from './useEventModal';
import { renderHook } from '@testing-library/react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useEventModal', () => {
  test('returns context value', () => {
    const mockContextValue = { isOpen: false, toggleModal: jest.fn() };
    (useContext as jest.Mock).mockImplementation(() => mockContextValue);

    const { result } = renderHook(() => useEventModal());

    expect(result.current).toEqual(mockContextValue);
  });
});
