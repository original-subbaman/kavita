import { Snackbar, Alert } from "@mui/material";
const ResponseSnackbar = ({
  open,
  autoHideDuration = 2000,
  onClose,
  severity,
  message,
  position = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ResponseSnackbar;
