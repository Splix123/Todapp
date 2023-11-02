// Libraries
import { useState } from "react";
// import { useMutation } from "react-query";
import { TableCell, TextField, Typography } from "@mui/material";

// Types
type Task = {
  id: number;
  title: string;
  checked: boolean;
};

// Mutation functions
async function changeTask(changedTask: Task) {
  const response = await fetch(
    `http://localhost:8000/tasks/${changedTask.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedTask),
    }
  );
  return response.json();
}

function EditableCell({ title }: { title: string }) {
  // States
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(title);

  // Mutations
  // const { mutateAsync: changeTaskMutation } = useMutation({
  //   mutationFn: changeTask,
  // });

  return (
    //TODO: maybe onmouseOver und onmouseout in die cell packen weil weniger buggy
    //TODO: Entscheiden ob click oder mousoverw
    <>
      <TableCell>
        {isInEditMode ? (
          <TextField
            variant="standard"
            autoFocus
            defaultValue={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onMouseOut={() => {
              setIsInEditMode(false);
              // if (title) {
              // }
            }}
          />
        ) : (
          <Typography
            // onMouseOver={() => setIsInEditMode(true)}
            onClick={() => setIsInEditMode(true)}
          >
            {title}
          </Typography>
        )}
      </TableCell>
    </>
  );
}

export default EditableCell;
