// Libraries
import { useState } from "react";
import { useMutation } from "react-query";
import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";

// Types
import { Task } from "../../types.d";

// Stores
import taskStore from "../store/taskStore";
import listStore from "../store/listStore";

// Mutation functions
async function addTaskFunction(newTask: Task) {
  const response = await fetch("http://localhost:8000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
}

function ContentTableNewTask() {
  // States
  const { tasks, addTask } = taskStore();
  const { currentList } = listStore();
  const [newTitle, setNewTitle] = useState<string>("");

  // Mutations
  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTaskFunction,
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
                  id: parseFloat(`${currentList}.${tasks.length + 1}`),
                  title: newTitle,
                  checked: false,
                };
                addTask(newTask);
                addTodoMutation(newTask);
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
