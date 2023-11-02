// Libraries
import { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";

// Types
type Task = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  changeCheckboxMutation: (changedTask: Task) => void;
  deleteTaskMutation: (taskId: number) => void;
};

function ContentTableHead({
  tasks,
  setTasks,
  changeCheckboxMutation,
  deleteTaskMutation,
}: Props) {
  // States
  const [parentCheckboxChecked, setParentCheckboxChecked] =
    useState<boolean>(false);

  const [parentCheckboxIndetermininate, setParentCheckboxIndeterminate] =
    useState<boolean>(false);

  // Effects
  const someTasksChecked = tasks.some((task) => task.checked);
  const everyTaskChecked = tasks.every((task) => task.checked);
  useEffect(() => {
    setParentCheckboxChecked(everyTaskChecked);
  }, [everyTaskChecked]);

  useEffect(() => {
    setParentCheckboxIndeterminate(someTasksChecked && !everyTaskChecked);
  }, [everyTaskChecked, someTasksChecked]);

  // Handlers
  const handleParentCheckboxChange = () => {
    setParentCheckboxChecked(!parentCheckboxChecked);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      checked: !parentCheckboxChecked,
    }));
    setTasks(updatedTasks);
    tasks.map((task) => {
      changeCheckboxMutation({ ...task, checked: !parentCheckboxChecked });
    });
  };

  const handleDeleteAllTasks = () => {
    const updatetTasks = tasks.filter((task) => !task.checked);
    setTasks(updatetTasks);
    tasks.map((task) => {
      if (task.checked === true) {
        deleteTaskMutation(task.id);
      }
    });
  };

  return (
    <>
      <TableHead>
        <TableRow role="checkbox">
          <TableCell>
            <Tooltip title="(Un)Check all tasks">
              <Checkbox
                checked={parentCheckboxChecked}
                indeterminate={parentCheckboxIndetermininate}
                onChange={handleParentCheckboxChange}
              />
            </Tooltip>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Tasks</Typography>
          </TableCell>
          <TableCell>
            <Tooltip title="Delete all finished tasks">
              <IconButton onClick={handleDeleteAllTasks}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default ContentTableHead;
