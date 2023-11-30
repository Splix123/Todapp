// Libraries
import { split } from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { TableCell, TextField, Typography } from "@mui/material";

// Types
import { Task } from "../../types.d";

// Stores
import taskStore from "../store/taskStore";

type Props = {
  taskId: number;
};

// Mutation functions
async function changeTaskFunction(changedTask: Task) {
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
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  return response.json();
}

function EditableCell({ taskId }: Props) {
  const shortTaskId = Number(split(taskId.toString(), ".")[1]) - 1;

  // States
  const { tasks, changeTask } = taskStore();
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(tasks[shortTaskId].title);

  // Mutations
  const { mutateAsync: changeTaskMutation } = useMutation({
    mutationFn: changeTaskFunction,
  });

  return (
    <>
      <TableCell>
        {isInEditMode ? (
          <TextField
            variant="standard"
            autoFocus
            defaultValue={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (tasks[shortTaskId].title !== newValue) {
                  changeTask(shortTaskId, newValue),
                    changeTaskMutation({
                      ...tasks[shortTaskId],
                      title: newValue,
                    });
                }
                setIsInEditMode(false);
              }
            }}
            onBlur={() => setIsInEditMode(false)}
          />
        ) : (
          <Typography onClick={() => setIsInEditMode(true)}>
            {tasks[shortTaskId].title}
          </Typography>
        )}
      </TableCell>
    </>
  );
}

export default EditableCell;
