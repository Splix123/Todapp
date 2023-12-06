// Libraries
import { some, every, forEach } from "lodash";
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
import { Task } from "../../types.d";

type Props = {
  changeCheckboxMutation: (changedTask: Task) => void;
  deleteTaskMutation: (taskId: number) => void;
};

// Stores
import taskStore from "../store/taskStore";
import snackbarStore from "../store/snackbarStore";

function ContentTableHead({
  changeCheckboxMutation,
  deleteTaskMutation,
}: Props) {
  // States
  const { tasks, checkAllTasks, deleteCheckedTasks } = taskStore();
  const { openSnackbar } = snackbarStore();

  const [parentCheckboxChecked, setParentCheckboxChecked] =
    useState<boolean>(false);

  const [parentCheckboxIndetermininate, setParentCheckboxIndeterminate] =
    useState<boolean>(false);

  // Effects
  const someTasksChecked = some(tasks, "checked");
  const everyTaskChecked = every(tasks, "checked");
  useEffect(() => {
    setParentCheckboxChecked(everyTaskChecked);
  }, [everyTaskChecked]);

  useEffect(() => {
    setParentCheckboxIndeterminate(someTasksChecked && !everyTaskChecked);
  }, [everyTaskChecked, someTasksChecked]);

  // Handlers
  const handleParentCheckboxChange = () => {
    setParentCheckboxChecked(!parentCheckboxChecked);
    checkAllTasks(!parentCheckboxChecked);
    forEach(tasks, (task) => {
      changeCheckboxMutation({ ...task, checked: !parentCheckboxChecked });
    });
  };

  const handleDeleteAllTasks = () => {
    deleteCheckedTasks();
    forEach(tasks, (task) => {
      if (task.checked === true) {
        deleteTaskMutation(task.id);
      }
    });
    openSnackbar({ severity: "warning", text: "Deleted all finished tasks!" });
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
