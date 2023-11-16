// Libraries
import { Button, Stack, Typography } from "@mui/material";

// Icons
import CloudOffIcon from "@mui/icons-material/CloudOff";

// FIXME: Create Proper "No Data" Screen
// FIXME: Use the status from React-Query instead of data.lenght === 0
// TODO: Add retry-button
function ContentError() {
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
        <Button variant="contained">Try Again</Button>
      </Stack>
    </>
  );
}

export default ContentError;
