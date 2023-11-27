// Libraries
import { split } from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { TableCell, TextField, Typography } from "@mui/material";

// Types
import { Task } from "../../types.d";

type Props = {
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  taskId: number;
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
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  return response.json();
}

function EditableCell({ tasks, setTasks, taskId }: Props) {
  const shortTaskId = Number(split(taskId.toString(), ".")[1]) - 1;

  // States
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(tasks[shortTaskId].title);

  // Mutations
  const { mutateAsync: changeTaskMutation } = useMutation({
    mutationFn: changeTask,
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
                  const updatedTask = {
                    ...tasks[shortTaskId],
                    title: newValue,
                  };
                  const updatedTasks = [...tasks];
                  updatedTasks[shortTaskId] = updatedTask;
                  setTasks(updatedTasks);
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
          <Typography
            // onMouseOver={() => setIsInEditMode(true)}
            onClick={() => setIsInEditMode(true)}
          >
            {tasks[shortTaskId].title}
          </Typography>
        )}
      </TableCell>
    </>
  );
}

export default EditableCell;
