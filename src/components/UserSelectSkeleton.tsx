//Libraries
import { Skeleton, Typography } from "@mui/material";

function UserSelectSkeleton() {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h1">Users</Typography>
      <Skeleton
        variant="circular"
        height={120}
        width={120}
        sx={{ display: "inline-block" }}
      />
      <Skeleton
        variant="circular"
        height={120}
        width={120}
        sx={{ display: "inline-block" }}
      />
      <Skeleton
        variant="circular"
        height={120}
        width={120}
        sx={{ display: "inline-block" }}
      />
    </div>
  );
}

export default UserSelectSkeleton;
