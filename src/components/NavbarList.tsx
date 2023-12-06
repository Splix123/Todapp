// Libraries
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// Components
import NavbarListSkeleton from "./NavbarListSkeleton";
import NavbarListAdd from "./NavbarListAdd";

// Icons
import StarIcon from "@mui/icons-material/Star";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondIcon from "@mui/icons-material/Diamond";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DeleteIcon from "@mui/icons-material/Delete";

// Types
import { List as TList } from "../../types.d";

// Stores
import listStore from "../store/listStore";
import snackbarstStore from "../store/snackbarStore";

// Icons
const icons = [
  <StarIcon color="primary" />,
  <ArchitectureIcon color="primary" />,
  <Brightness2Icon color="primary" />,
  <CategoryIcon color="primary" />,
  <DiamondIcon color="primary" />,
  <ElectricBoltIcon color="primary" />,
];

// Functions
async function deleteList(listId: number) {
  const response = await fetch(`http://localhost:8000/lists/${listId}`, {
    method: "DELETE",
  });
  return response.json();
}

function NavbarList() {
  // Fetching Data
  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      fetch("http://localhost:8000/lists").then((response) => {
        return response.json();
      }),
    queryKey: ["lists"],
  });

  //Mutations
  const { mutateAsync: deleteListMutation } = useMutation({
    mutationFn: deleteList,
  });

  // States
  const { lists, setLists, removeList, currentList, setCurrentList } =
    listStore();
  useEffect(() => {
    if (!isLoading && data) {
      setLists(data);
    }
  }, [isLoading, data, setLists]);

  const [hoverOverList, setHoverOverList] = useState({
    listId: 0,
    hovered: false,
  });

  const { openSnackbar } = snackbarstStore();

  // Handlers
  const handleListItemClick = (index: number) => {
    setCurrentList(index);
  };

  const handleDeleteList = (listId: number) => {
    setCurrentList(1);
    removeList(listId);
    deleteListMutation(listId);
    openSnackbar({ severity: "warning", text: "Deleted List!" });
  };

  //Loading screen
  if (isLoading) {
    return <NavbarListSkeleton />;
  }

  return (
    <>
      {isLoading && <NavbarListSkeleton />}

      {isError && (
        <Typography variant="h6" textAlign="center">
          Can't reach TODAP-server
        </Typography>
      )}

      <List>
        {lists.map((list: TList) => (
          <ListItemButton
            key={list.id}
            selected={currentList === list.id}
            onClick={() => handleListItemClick(list.id)}
            onMouseOver={() =>
              setHoverOverList({ listId: list.id, hovered: true })
            }
            onMouseOut={() =>
              setHoverOverList({ listId: list.id, hovered: false })
            }
          >
            <ListItemIcon>{icons[list.icon]}</ListItemIcon>
            <ListItemText primary={list.label} />
            {hoverOverList.hovered && hoverOverList.listId === list.id && (
              <IconButton onClick={() => handleDeleteList(list.id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </ListItemButton>
        ))}
        <Divider style={{ margin: "10px" }} />
        <NavbarListAdd iconsLength={icons.length} />
      </List>
    </>
  );
}

export default NavbarList;
