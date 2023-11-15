// Libraries
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Table, TableContainer, Typography } from "@mui/material";

//Components
import ContentSkeleton from "./ContentSkeleton";
import ContentTableHead from "./ContentTableHead";
import ContentTableBody from "./ContentTableBody";

// Types
type Task = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  selectedListIndex: number;
  selectedListName: string;
};

// Mutation functions
// TODO: Error Handling
async function changeCheckbox(changedTask: Task) {
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

// Functions
async function deleteTask(taskId: number) {
  const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: "DELETE",
  });
  return response.json();
}

function Content({ selectedListIndex, selectedListName }: Props) {
  //Fetch data
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/tasks?id_like=${selectedListIndex}.`).then(
        (response) => {
          if (!response.ok) {
            // TODO: Error Handling
            throw new Error("Network response was not ok");
          }
          return response.json();
        }
      ),
    queryKey: ["tasks", selectedListIndex],
  });

  //Mutations
  const { mutateAsync: changeCheckboxMutation } = useMutation({
    mutationFn: changeCheckbox,
  });

  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
  });

  // States
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    if (!isLoading && data) {
      setTasks(data);
    }
  }, [isLoading, data]);

  // Loading screen
  if (isLoading) {
    return <ContentSkeleton />;
  }

  // FIXME: Create Proper "No Data" Screen
  // FIXME: Use the status from React-Query instead of data.lenght === 0
  // TODO: Add retry-button
  if (!data || data.length === 0) {
    return (
      <Typography variant="h2" textAlign="center" sx={{ marginTop: 10 }}>
        Sorry something is not working correctly
      </Typography>
    );
  }

  return (
    <div style={{ marginLeft: "350px" }}>
      <Typography
        variant="h3"
        fontWeight="light"
        paddingTop={3}
        paddingBottom={5}
      >
        {selectedListName}
      </Typography>
      <TableContainer sx={{ borderRadius: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <ContentTableHead
            tasks={tasks}
            setTasks={setTasks}
            changeCheckboxMutation={changeCheckboxMutation}
            deleteTaskMutation={deleteTaskMutation}
          />
          <ContentTableBody
            selectedListIndex={selectedListIndex}
            tasks={tasks}
            setTasks={setTasks}
            changeCheckboxMutation={changeCheckboxMutation}
            deleteTaskMutation={deleteTaskMutation}
          />
        </Table>
      </TableContainer>
    </div>
  );
}

export default Content;
