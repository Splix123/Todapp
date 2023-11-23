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

type Snackbar = {
  open: boolean;
  severity: "success" | "info" | "error" | "warning";
  text: string;
};

// Constants
const DRAWER_WIDTH = 300;

function Navbar({
  selectedListIndex,
  setSelectedListIndex,
  setSelectedListName,
}: Props) {
  // States
  const [snackbar, setSnackbar] = useState<Snackbar>({
    open: false,
    severity: "success",
    text: "",
  });

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
        setSnackbar={setSnackbar}
      />
      <CustomSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        setSnackbar={setSnackbar}
      />
    </Drawer>
  );
}

export default Navbar;
