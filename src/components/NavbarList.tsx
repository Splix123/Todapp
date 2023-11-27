// Libraries
import { filter } from "lodash";
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
  const [lists, setLists] = useState<TList[]>([]);
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
    const updatedLists = filter(lists, function (list) {
      return list.id !== listId;
    });
    setSelectedListIndex(1);
    setLists(updatedLists);
    deleteListMutation(listId);
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
    </>
  );
}

export default NavbarList;
