// Libraries
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Avatar,
  Button,
  Divider,
  Grow,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";

//Components
import UserSelectSkeleton from "./components/UserSelectSkeleton";
import AddUser from "./components/AddUser";

// Types
import { User } from "../types.d";

// Stores
import snackbarStore from "./store/snackbarStore";
import userStore from "./store/userStore";

// Functions
async function deleteUser(userId: number) {
  const response = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

function UserSelect() {
  //Fetch data
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/users`).then((response) => {
        return response.json();
      }),
    queryKey: ["users"],
  });

  //Mutations
  const { mutateAsync: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
  });

  // States
  const { openSnackbar } = snackbarStore();
  const { users, setUsers, removeUser } = userStore();
  useEffect(() => {
    if (!isLoading && data) {
      setUsers(data);
    }
  }, [isLoading, data, setUsers]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUser, setSelectedUser] = useState(0);

  // Handlers
  const handleUserSelect = () => {
    openSnackbar({ severity: "success", text: "Selected User!" });
  };

  const handleRightClick = (e: React.MouseEvent, userId: number) => {
    setSelectedUser(userId);
    e.preventDefault();
    setAnchorEl(e.currentTarget as HTMLButtonElement);
  };

  const handleDelete = () => {
    deleteUserMutation(selectedUser);
    removeUser(selectedUser);
    // BUG: Snackbar does not show up
    openSnackbar({ severity: "warning", text: "Deleted User!" });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return <UserSelectSkeleton />;
  }

  let timeout = 100;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // BUG: Clicking on a user the first time does not work
  return (
    <>
      <Typography variant="h1" textAlign="center" sx={{ margin: 5 }}>
        Users
      </Typography>
      <Divider variant="middle" />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={{ margin: 5 }}
      >
        {users.map((user: User) => {
          timeout += 300;
          return (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: timeout }}
              key={user.id}
            >
              <IconButton
                color="info"
                href="/main"
                onClick={handleUserSelect}
                onContextMenu={(e) => handleRightClick(e, user.id)}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ height: 120, width: 120 }}
                >
                  {user.name}
                </Avatar>
              </IconButton>
            </Grow>
          );
        })}
        {/* BUG: Grow does not work with right timing */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Button
            sx={{ p: 2 }}
            variant="text"
            color="error"
            onClick={handleDelete}
          >
            Delete User
          </Button>
        </Popover>
        <AddUser timeout={timeout} />
      </Stack>
    </>
  );
}

export default UserSelect;
