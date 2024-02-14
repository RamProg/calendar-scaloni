import { useContext } from 'react';
import { useEventModal } from './useEventModal';
import { renderHook } from '@testing-library/react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useEventModal', () => {
  it('returns context value', () => {
    const mockContextValue = { isOpen: false, toggleModal: jest.fn() };
    (useContext as jest.Mock).mockImplementation(() => mockContextValue);

    const { result } = renderHook(() => useEventModal());

    expect(result.current).toEqual(mockContextValue);
  });

  it('throws an error when the context is not available', () => {
    (useContext as jest.Mock).mockImplementation(() => undefined);

    try {
      renderHook(() => useEventModal());
    } catch (error) {
      expect(error).toEqual(
        Error('useEventModal must be used within a EventModalProvider')
      );
    }
  });
});
