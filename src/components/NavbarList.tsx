// TODO: Make lists deletable

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
type List = {
  id: number;
  label: string;
  icon: number;
};

type Props = {
  selectedListIndex: number;
  setSelectedListIndex: (index: number) => void;
  setSelectedListName: (name: string) => void;
  setSnackbarOpen: (open: boolean) => void;
};

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

function NavbarList({
  selectedListIndex,
  setSelectedListIndex,
  setSelectedListName,
  setSnackbarOpen,
}: Props) {
  // Fetching the List DB
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch("http://localhost:8000/lists").then((response) => {
        // TODO: Error Handling
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }),
    queryKey: ["lists"],
  });

  //Mutations
  const { mutateAsync: deleteListMutation } = useMutation({
    mutationFn: deleteList,
  });

  // States
  const [lists, setLists] = useState<List[]>([]);
  useEffect(() => {
    if (!isLoading && data) {
      setLists(data);
    }
  }, [isLoading, data]);

  const [hoverOverList, setHoverOverList] = useState({
    listId: 0,
    hovered: false,
  });

  // Handlers
  const handleListItemClick = (index: number) => {
    setSelectedListIndex(index);
    setSelectedListName(lists[index - 1].label);
  };

  const handleDeleteList = (listId: number) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    deleteListMutation(listId);
  };

  //Loading screen
  if (isLoading) {
    return <NavbarListSkeleton />;
  }

  return (
    <List>
      {lists.map((list: List) => (
        <ListItemButton
          key={list.id}
          selected={selectedListIndex === list.id}
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
      <NavbarListAdd
        lists={lists}
        setLists={setLists}
        iconsLength={icons.length}
        setSnackbarOpen={setSnackbarOpen}
      />
    </List>
  );
}

export default NavbarList;
