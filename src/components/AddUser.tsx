// Libraries
import { useState } from "react";
import { useMutation } from "react-query";
import {
  Grow,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

// Icons
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// Types
import { User } from "../../types.d";

type Props = {
  timeout: number;
};

// Stores
import userStore from "../store/userStore";

// Mutation functions
async function addUserFunction(user: User) {
  const response = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

function AddUser({ timeout }: Props) {
  //Mutations
  const { mutateAsync: addUserFunction } = useMutation({
    mutationFn: addUserFunction,
  });

  // States
  const { users, addUser } = userStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(false);

  // Handlers
  const handleClickAddUser = () => {
    setOpenDialog(true);
  };

  const handleAddUser = () => {
    if (name === "") {
      setError(true);
    } else {
      // TODO: implemet user picture here
      addUserFunction({ id: users.length + 1, name: name });
      addUser({ id: users.length + 1, name: name });
      setOpenDialog(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Grow
        in
        style={{ marginTop: 200, transformOrigin: "0 0 0" }}
        {...{ timeout: timeout }}
      >
        <IconButton color="success" onClick={handleClickAddUser}>
          <Avatar alt="Add User" sx={{ height: 120, width: 120 }}>
            <PersonAddAlt1Icon sx={{ height: 40, width: 40 }} />
          </Avatar>
        </IconButton>
      </Grow>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new User please provide a Name and an optional Picture.
          </DialogContentText>
          <TextField
            error={error}
            helperText="Required"
            autoFocus
            margin="dense"
            id="name"
            label="User Name*"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="picture"
            label="Picture URL"
            type="url"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setPicture(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddUser;
