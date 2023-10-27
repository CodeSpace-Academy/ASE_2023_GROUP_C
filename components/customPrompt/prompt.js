import styles from './prompt.module.css'

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
function ConfirmationDialog(props) {
  const { message, onConfirm, onCancel } = props;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <p className='text-black'>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>Cancel</button>
          <button className={`${styles.button} ${styles.okButton}`} onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;