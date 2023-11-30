// Libraries
import { useState } from "react";
import { Drawer, Typography } from "@mui/material";

// Components
import NavbarList from "./NavbarList";
import CustomSnackbar from "./CustomSnackbar";

// Constants
const DRAWER_WIDTH = 300;

function Navbar() {
  // States
  const [snackbarOpen, setSnackbaropen] = useState<boolean>(false);

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
        },
      }}
      variant="persistent"
      open={true}
    >
      <Typography
        variant="h4"
        letterSpacing={25}
        align="center"
        paddingTop={5}
        paddingBottom={5}
      >
        TODAP
      </Typography>
      <NavbarList setSnackbarOpen={setSnackbaropen} />
      <CustomSnackbar snackbarOpen={snackbarOpen} />
    </Drawer>
  );
}

export default Navbar;
