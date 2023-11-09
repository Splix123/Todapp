// Libraries
import { useQuery } from "@tanstack/react-query";
import { Avatar, Grow, IconButton, Typography } from "@mui/material";

//Components
import UserSelectSkeleton from "./components/UserSelectSkeleton";
import AddUser from "./components/AddUser";

// Types
type User = {
  id: number;
  name: string;
};

function UserSelect() {
  //Fetch data
  const { data: users, isLoading } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/users`).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }),
    queryKey: ["users"],
  });

  if (isLoading) {
    // TODO: Skeleton machen
    return <UserSelectSkeleton />;
  }

  let timeout = 0;

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
            <IconButton color="info" href="/main">
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
