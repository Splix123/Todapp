// Libraries
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";

// Icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";

// Types
type Props = {
  lists: List[];
  setLists: (newLists: List[]) => void;
  iconsLength: number;
  setSnackbarOpen: (open: boolean) => void;
};

type List = {
  id: number;
  label: string;
  icon: number;
};

// Mutation functions
async function addList(list: List) {
  const response = await fetch("http://localhost:8000/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  return response.json();
}

function NavbarListAdd({
  lists,
  setLists,
  iconsLength,
  setSnackbarOpen,
}: Props) {
  //Mutations
  const { mutateAsync: addListMutation } = useMutation({
    mutationFn: addList,
  });

  // States
  const [newTitle, setNewTitle] = useState<string>("");

  // Handlers
  const snackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNewList = () => {
    const newList = {
      id: lists.length + 1,
      label: newTitle,
      icon: Math.floor(Math.random() * iconsLength),
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    addListMutation(newList);
    setSnackbarOpen(true);
    setTimeout(snackbarClose, 2500);
    setNewTitle("");
  };

  return (
    <>
      <ListItem>
        <IconButton onClick={handleNewList} sx={{ marginLeft: -1 }}>
          <ControlPointIcon color="primary" />
        </IconButton>
        <ListItemText>
          <TextField
            sx={{ marginLeft: 2 }}
            placeholder="New List"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleNewList();
              }
            }}
          />
        </ListItemText>
      </ListItem>
    </>
  );
}

export default NavbarListAdd;
