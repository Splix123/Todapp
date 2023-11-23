// Libraries
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Table, TableContainer, Typography } from "@mui/material";

//Components
import ContentSkeleton from "./ContentSkeleton";
import ContentError from "./ContentError";
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
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/tasks?id_like=${selectedListIndex}.`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Could not load tasks properly");
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

  return (
    <div
      style={{ marginLeft: "350px", marginTop: "100px", marginRight: "50px" }}
    >
      {isLoading && <ContentSkeleton />}

      {isError && <ContentError refetchFn={refetch} />}

      {!isLoading && !isError && (
        <div>
          {/* BUG: No listName for the first list displayed */}
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
      )}
    </div>
  );
}

export default Content;
