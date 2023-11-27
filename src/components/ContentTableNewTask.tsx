// Libraries
import { useState } from "react";
import { useMutation } from "react-query";
import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";

// Types
import { Task } from "../../types.d";

type Props = {
  selectedListIndex: number;
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
};

// Mutation functions
async function addTask(newTask: Task) {
  const response = await fetch("http://localhost:8000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
}

function ContentTableNewTask({ selectedListIndex, tasks, setTasks }: Props) {
  // States
  const [newTitle, setNewTitle] = useState<string>("");

  // Mutations
  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTask,
  });

  return (
    <>
      <TableRow role="checkbox" hover sx={{ opacity: 0.4 }}>
        <TableCell>
          <Checkbox disabled />
        </TableCell>
        <TableCell>
          <TextField
            label="New Task..."
            variant="standard"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onKeyUp={async (e) => {
              if (e.key === "Enter") {
                const newTask: Task = {
                  id: parseFloat(`${selectedListIndex}.${tasks.length + 1}`),
                  title: newTitle,
                  checked: false,
                };
                const updatedTasks = [...tasks, newTask];
                setTasks(updatedTasks);
                try {
                  addTodoMutation(newTask);
                } catch (error) {
                  console.log(error);
                }
                setNewTitle("");
              }
            }}
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
}

export default ContentTableNewTask;
