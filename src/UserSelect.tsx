// Libraries
import { useQuery } from "react-query";
import { Avatar, Grow, IconButton, Typography } from "@mui/material";

//Components
import UserSelectSkeleton from "./components/UserSelectSkeleton";
import AddUser from "./components/AddUser";

// Types
import { User } from "../types.d";

// Stores
import snackbarStore from "./store/snackbarStore";

function UserSelect() {
  //Fetch data
  const { data: users, isLoading } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/users`).then((response) => {
        return response.json();
      }),
    queryKey: ["users"],
  });

  // States
  const { openSnackbar } = snackbarStore();

  // Handlers
  const handleUserSelect = () => {
    openSnackbar({ severity: "success", text: "Selected User!" });
  };
  if (isLoading) {
    return <UserSelectSkeleton />;
  }

  let timeout = 0;

  // TODO: Use MUI Stack
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h1">Users</Typography>
      {users.map((user: User) => {
        timeout += 300;
        return (
          <Grow
            in
            style={{ marginTop: 200, transformOrigin: "0 0 0" }}
            {...{ timeout: timeout }}
            key={user.id}
          >
            <IconButton color="info" href="/main" onClick={handleUserSelect}>
              <Avatar alt={user.name} sx={{ height: 120, width: 120 }}>
                {user.name}
              </Avatar>
            </IconButton>
          </Grow>
        );
      })}
      <AddUser timeout={timeout} />
    </div>
  );
}

export default UserSelect;
