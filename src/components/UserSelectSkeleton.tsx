//Libraries
import { Divider, Skeleton, Stack, Typography } from "@mui/material";

function UserSelectSkeleton() {
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
        <Skeleton variant="circular" height={120} width={120} />
        <Skeleton variant="circular" height={120} width={120} />
        <Skeleton variant="circular" height={120} width={120} />
        <Skeleton variant="circular" height={120} width={120} />
      </Stack>
    </>
  );
}

export default UserSelectSkeleton;
