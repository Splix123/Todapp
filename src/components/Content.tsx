// Libraries
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Table, TableContainer, Typography } from "@mui/material";

//Components
import ContentSkeleton from "./ContentSkeleton";
import ContentError from "./ContentError";
import ContentTableHead from "./ContentTableHead";
import ContentTableBody from "./ContentTableBody";

// Types
import { Task } from "../../types.d";

// Stores
import taskStore from "../store/taskStore";
import listStore from "../store/listStore";

// Mutation functions
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

async function deleteTask(taskId: number) {
  const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: "DELETE",
  });
  return response.json();
}

function Content() {
  // ListState for fetching th reight data
  const { lists, currentList } = listStore();

  //Fetch data
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:8000/tasks?id_like=${currentList}.`).then(
        (response) => {
          return response.json();
        }
      ),
    queryKey: ["tasks", currentList],
  });

  //Mutations
  const { mutateAsync: changeCheckboxMutation } = useMutation({
    mutationFn: changeCheckbox,
  });

  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
  });

  // States
  const { setTasks } = taskStore();
  useEffect(() => {
    if (!isLoading && data) {
      setTasks(data);
    }
  }, [isLoading, data, setTasks]);

  return (
    <div
      style={{ marginLeft: "350px", marginTop: "100px", marginRight: "50px" }}
    >
      {isLoading && <ContentSkeleton />}

      {isError && <ContentError refetchFn={refetch} />}

      {!isLoading && !isError && (
        <div>
          <Typography
            variant="h3"
            fontWeight="light"
            paddingTop={3}
            paddingBottom={5}
          >
            {lists[currentList - 1].label}
          </Typography>
          <TableContainer sx={{ borderRadius: 1 }}>
            <Table stickyHeader aria-label="sticky table">
              <ContentTableHead
                changeCheckboxMutation={changeCheckboxMutation}
                deleteTaskMutation={deleteTaskMutation}
              />
              <ContentTableBody
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
