// Libraries
import { random } from "lodash";
import { useMutation } from "react-query";
import { useState } from "react";
import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";

// Icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";

// Types
import { List } from "../../types.d";

type Props = {
  iconsLength: number;
  setSnackbar: (newSnackbar: Snackbar) => void;
};

// Stores
import listStore from "../store/listStore";

// Mutation functions
async function addListFunction(list: List) {
  const response = await fetch("http://localhost:8000/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  return response.json();
}

function NavbarListAdd({ iconsLength, setSnackbarOpen }: Props) {
  //Mutations
  const { mutateAsync: addListMutation } = useMutation({
    mutationFn: addListFunction,
  });

  // States
  const { lists, addList } = listStore();
  const [newTitle, setNewTitle] = useState<string>("");

  // Handlers
  const handleNewList = () => {
    const newList = {
      id: lists.length + 1,
      label: newTitle,
      icon: random(0, iconsLength - 1),
    };
    addList(newList);
    addListMutation(newList);
    setSnackbar({ open: true, severity: "success", text: "Created List!" });
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
