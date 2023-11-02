// Libraries
import { Skeleton } from "@mui/material";

function ContentSkeleton() {
  return (
    <>
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 3, marginBottom: 3 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <Skeleton
        variant="rounded"
        height={60}
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
    </>
  );
}

export default ContentSkeleton;
