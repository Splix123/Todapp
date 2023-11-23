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
            backgroundColor: "#388e3c",
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
