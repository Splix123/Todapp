// Libraries
import { filter } from "lodash";
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
  selectedListIndex: number;
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  changeCheckboxMutation: (changedTask: Task) => void;
  deleteTaskMutation: (taskId: number) => void;
};

function ContentTableBody({
  selectedListIndex,
  tasks,
  setTasks,
  changeCheckboxMutation,
  deleteTaskMutation,
}: Props) {
  // States
  const [hoverOverRow, setHoverOverRow] = useState({
    rowId: 0,
    hovered: false,
  });

  // Handlers
  const handleCheckboxChange = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const checkedTask = { ...task, checked: !task.checked };
        changeCheckboxMutation(checkedTask);
        return checkedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = filter(tasks, function (task: Task) {
      return task.id !== taskId;
    });
    setTasks(updatedTasks);
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
            <EditableCell tasks={tasks} setTasks={setTasks} taskId={task.id} />
            <TableCell>
              {hoverOverRow.hovered && hoverOverRow.rowId === task.id && (
                <IconButton onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
        <ContentTableNewTask
          selectedListIndex={selectedListIndex}
          tasks={tasks}
          setTasks={setTasks}
        />
      </TableBody>
    </>
  );
}

export default ContentTableBody;
