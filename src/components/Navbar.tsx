// Libraries
import { useState } from "react";
import { Drawer, Typography } from "@mui/material";

// Components
import NavbarList from "./NavbarList";
import CustomSnackbar from "./CustomSnackbar";

// Types
type Props = {
  selectedListIndex: number;
  setSelectedListIndex: (index: number) => void;
  setSelectedListName: (name: string) => void;
};

// Constants
const DRAWER_WIDTH = 300;

function Navbar({
  selectedListIndex,
  setSelectedListIndex,
  setSelectedListName,
}: Props) {
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
      <NavbarList
        selectedListIndex={selectedListIndex}
        setSelectedListIndex={setSelectedListIndex}
        setSelectedListName={setSelectedListName}
        setSnackbarOpen={setSnackbaropen}
      />
      <CustomSnackbar snackbarOpen={snackbarOpen} />
    </Drawer>
  );
}

export default Navbar;
