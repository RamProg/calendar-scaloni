import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('calls onSave with correct id when Save/Create button is clicked', () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Footer
        onSave={onSave}
        onDelete={() => {}}
        closeModal={() => {}}
        _id="1"
        editOrAdd="add"
      />
    );

    fireEvent.click(getByText('Create'));
    expect(onSave).toHaveBeenCalledWith('1');
  });

  it('calls onDelete with correct id when Delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <Footer
        onSave={() => {}}
        onDelete={onDelete}
        closeModal={() => {}}
        _id="1"
        editOrAdd="edit"
      />
    );

    fireEvent.click(getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('calls closeModal when Close button is clicked', () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <Footer
        onSave={() => {}}
        onDelete={() => {}}
        closeModal={closeModal}
        _id="1"
        editOrAdd="add"
      />
    );

    fireEvent.click(getByText('Close'));
    expect(closeModal).toHaveBeenCalled();
  });

  it('renders Create button when editOrAdd is add', () => {
    const { getByText } = render(
      <Footer
        onSave={() => {}}
        onDelete={() => {}}
        closeModal={() => {}}
        _id="1"
        editOrAdd="add"
      />
    );

    expect(getByText('Create')).toBeInTheDocument();
  });

  it('renders Save and Delete buttons when editOrAdd is edit', () => {
    const { getByText } = render(
      <Footer
        onSave={() => {}}
        onDelete={() => {}}
        closeModal={() => {}}
        _id="1"
        editOrAdd="edit"
      />
    );

    expect(getByText('Save')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });
});
