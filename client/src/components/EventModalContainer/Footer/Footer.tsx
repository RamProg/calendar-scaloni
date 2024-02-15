import Button from '@/src/components/common/Button/Button';

type FooterProps = {
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
  closeModal: () => void;
  _id: string;
  editOrAdd: 'edit' | 'add';
};

const Footer: React.FC<FooterProps> = ({
  onSave,
  onDelete,
  closeModal,
  _id,
  editOrAdd,
}) => (
  <>
    <Button
      styleType="secondary"
      onClick={() => onSave(_id)}
      label={editOrAdd === 'add' ? 'Create' : 'Save'}
      big={true}
      styles="mr-2 sm:ml-2 sm:mr-0"
    />
    {editOrAdd === 'edit' && (
      <Button
        styleType="tertiary"
        onClick={() => onDelete(_id)}
        label={'Delete'}
        big={true}
        styles="mr-2 sm:ml-2 sm:mr-0"
      />
    )}
    <Button onClick={closeModal} big={true} label="Close" />
  </>
);

export default Footer;
