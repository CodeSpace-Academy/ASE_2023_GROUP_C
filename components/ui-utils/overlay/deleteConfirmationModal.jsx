import Modal from '../Modal';

/**
 * ConfirmationDialog component for displaying a confirmation dialog box.
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.message - The message to display in the dialog.
 * @param {Function} props.onConfirm - The function to call when the user confirms.
 * @param {Function} props.onCancel - The function to call when the user cancels.
 *
 * @returns {JSX.Element} The rendered ConfirmationDialog component.
 */
export default function DeleteConfirmationModal(props) {
  const { onConfirm, onCancel, isOpen } = props;

  return (
    <Modal
      title="Delete"
      onSubmit={onConfirm}
      onClose={onCancel}
      isOpen={isOpen}
      footer="Delete"
      buttonColor="bg-red-600"
    >
      Are you sure you want to delete?
    </Modal>
  );
}
