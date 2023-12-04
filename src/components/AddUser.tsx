// Libraries
import { Grow, IconButton, Avatar } from "@mui/material";

// Icons
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// Types
type Props = {
  timeout: number;
};

function AddUser({ timeout }: Props) {
  return (
    <>
      <Grow in style={{ transformOrigin: "0 0 0" }} {...{ timeout: timeout }}>
        <IconButton color="success">
          {/* FIXME: user.name */}
          <Avatar alt="{user.name}" sx={{ height: 120, width: 120 }}>
            <PersonAddAlt1Icon sx={{ height: 40, width: 40 }} />
          </Avatar>
        </IconButton>
      </Grow>
    </>
  );
}

export default AddUser;
