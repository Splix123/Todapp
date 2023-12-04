// Libraries
import { useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from "@mui/material";

// Components
import EditableCell from "./EditableCell";
import ContentTableNewTask from "./ContentTableNewTask";

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

function ContentTableBody({
  changeCheckboxMutation,
  deleteTaskMutation,
}: Props) {
  // States
  const { tasks, removeTask, checkTask } = taskStore();
  const [hoverOverRow, setHoverOverRow] = useState({
    rowId: 0,
    hovered: false,
  });

  // Handlers
  const handleCheckboxChange = (taskId: number) => {
    // TODO: logic in die Function verschieben
    tasks.map((task) => {
      if (task.id === taskId) {
        changeCheckboxMutation({ ...task, checked: !task.checked });
      }
    });
    checkTask(taskId);
  };

  const handleDeleteTask = (taskId: number) => {
    removeTask(taskId);
    deleteTaskMutation(taskId);
  };

  return (
    <>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            onMouseOver={() =>
              setHoverOverRow({ rowId: task.id, hovered: true })
            }
            onMouseOut={() =>
              setHoverOverRow({ rowId: task.id, hovered: false })
            }
            key={task.id}
            role="checkbox"
            hover
            sx={{ cursor: "pointer" }}
          >
            <TableCell>
              <Checkbox
                checked={task.checked}
                onChange={() => handleCheckboxChange(task.id)}
              />
            </TableCell>
            <EditableCell taskId={task.id} />
            <TableCell>
              {hoverOverRow.hovered && hoverOverRow.rowId === task.id && (
                <IconButton onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
        <ContentTableNewTask />
      </TableBody>
    </>
  );
}

export default ContentTableBody;
