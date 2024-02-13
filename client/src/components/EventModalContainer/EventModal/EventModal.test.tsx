import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import EventModal from './EventModal';
import Footer from '../Footer/Footer';

describe('EventModal', () => {
  it('calls closeModal when onClose is triggered', () => {
    const closeModal = jest.fn();
    const { getByRole } = render(
      <EventModal
        closeModal={closeModal}
        footer={
          <Footer
            onSave={() => {}}
            onDelete={() => {}}
            closeModal={closeModal}
            _id={''}
            editOrAdd={'add'}
          />
        }
      />
    );

    fireEvent.click(getByRole('button', { name: /close/i }));
    expect(closeModal).toHaveBeenCalled();
  });

  it('renders footer content', () => {
    const { getByText } = render(
      <EventModal closeModal={() => {}} footer={<div>Footer</div>} />
    );

    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('renders EventFormContainer', () => {
    const { getByTestId } = render(
      <EventModal closeModal={() => {}} footer={<div>Footer</div>} />
    );

    expect(getByTestId('event-form-container')).toBeInTheDocument();
  });
});
