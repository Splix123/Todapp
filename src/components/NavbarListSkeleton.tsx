// Libraries
import { Skeleton } from "@mui/material";

function NavbarListSkeleton() {
  return (
    <>
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 1, marginBottom: 1 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 1, marginBottom: 1 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 1, marginBottom: 1 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 1, marginBottom: 1 }}
      />
    </>
  );
}

export default NavbarListSkeleton;
