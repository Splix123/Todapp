// Libraries
import { useQuery } from "react-query";
import {
  Avatar,
  Divider,
  Grow,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

//Components
import UserSelectSkeleton from "./components/UserSelectSkeleton";
import AddUser from "./components/AddUser";

// Types
import { User } from "../types.d";

function UserSelect() {
  //Fetch data
  const { data: users, isLoading } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/users`).then((response) => {
        return response.json();
      }),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <UserSelectSkeleton />;
  }

  let timeout = 0;

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
              <IconButton color="info" href="/main">
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
        <AddUser timeout={timeout} />
      </Stack>
    </>
  );
}

export default UserSelect;
