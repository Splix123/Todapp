// Libraries
import { Button, Stack, Typography } from "@mui/material";

// Icons
import CloudOffIcon from "@mui/icons-material/CloudOff";

// Types
type Props = {
  refetchFn: () => void;
};

// TODO: Add retry-button
function ContentError({ refetchFn }: Props) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        useFlexGap
        spacing={3}
      >
        <CloudOffIcon sx={{ fontSize: 250 }} />
        <Typography variant="h2">Sorry something went wrong</Typography>
        <Button variant="contained" onClick={() => refetchFn()}>
          Try Again
        </Button>
      </Stack>
    </>
  );
}

export default ContentError;
