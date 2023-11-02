// Libraries
import { Alert, Snackbar } from "@mui/material";

// Types
type Props = {
  snackbarOpen: boolean;
};

function CustomSnackbar({ snackbarOpen }: Props) {
  return (
    <>
      <Snackbar open={snackbarOpen}>
        <Alert
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#388e3c",
            fontWeight: "bold",
          }}
        >
          Created List!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomSnackbar;
