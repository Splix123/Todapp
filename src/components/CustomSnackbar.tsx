// Libraries
import { Alert, Snackbar } from "@mui/material";

// Types
type Snackbar = {
  open: boolean;
  severity: "success" | "info" | "error" | "warning";
  text: string;
};

type Props = {
  open: boolean;
  severity: "success" | "info" | "error" | "warning";
  text: string;
  setSnackbar: (newSnackbar: Snackbar) => void;
};

// TODO: put in the right colors
const snackbarColors = {
  success: "#388e3c",
  info: "#0288d1",
  error: "#d32f2f",
  warning: "#f57b00",
};

function CustomSnackbar({ open, severity, text, setSnackbar }: Props) {
  // Handlers
  const closeSnackbar = () => {
    setSnackbar({ open: false, severity: "success", text: "" });
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
