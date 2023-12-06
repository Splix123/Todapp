// Libraries
import { Alert, Snackbar } from "@mui/material";

// Stores
import snackbarstStore from "../store/snackbarStore";

// TODO: put in the right colors
const snackbarColors = {
  success: "#388e3c",
  info: "#0288d1",
  error: "#d32f2f",
  warning: "#f57b00",
};

function CustomSnackbar() {
  // States
  const { open, severity, text, openSnackbar } = snackbarstStore();

  // Handlers
  const closeSnackbar = () => {
    openSnackbar({ open: false, severity: "success", text: "" });
  };

  if (open) {
    setTimeout(closeSnackbar, 2500);
  }
  return (
    <>
      <Snackbar open={open}>
        <Alert
          severity={severity}
          sx={{
            width: "100%",
            backgroundColor: snackbarColors[severity],
            fontWeight: "bold",
          }}
        >
          {text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomSnackbar;
