import { Snackbar, Alert } from "@mui/material";
const ResponseSnackbar = ({
  open,
  autoHideDuration = 3000,
  onClose,
  severity,
  message,
  position = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      sx={{
        "& .MuiAlert-filledSuccess": {
          backgroundColor: "#30a46c", // radix-green
          color: "#fff",
        },
        "& .MuiAlert-filledInfo": {
          backgroundColor: "#0091ff", // radix-blue-9
          color: "#fff",
        },
        "& .MuiAlert-filledWarning": {
          backgroundColor: "#f5d90a", // radix-yellow-9
          color: "#222",
        },
        "& .MuiAlert-filledError": {
          backgroundColor: "#e5484d", // radix-red-9
          color: "#fff",
        },
      }}
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
