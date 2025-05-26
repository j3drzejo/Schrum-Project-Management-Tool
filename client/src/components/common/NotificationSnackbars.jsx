import { Snackbar, Alert } from '@mui/material';

const SNACKBAR_DURATION = 3000;
const ERROR_SNACKBAR_DURATION = 5000;

export default function NotificationSnackbars({
  successMessage,
  errorMessage,
  onCloseSuccess,
  onCloseError,
}) {
  return (
    <>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={onCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%' }}
          onClose={onCloseSuccess}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={ERROR_SNACKBAR_DURATION}
        onClose={onCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} onClose={onCloseError}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
