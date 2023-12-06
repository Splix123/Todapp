// Libraries
import { Drawer, Typography } from "@mui/material";

// Components
import NavbarList from "./NavbarList";
import CustomSnackbar from "./CustomSnackbar";

// Constants
const DRAWER_WIDTH = 300;

function Navbar() {
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
      <NavbarList />
      <CustomSnackbar />
    </Drawer>
  );
}

export default Navbar;
