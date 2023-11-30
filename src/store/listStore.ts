// Libraries
import create from "zustand";
import { filter } from "lodash";

// Types
import { List } from "../../types";

type StoreType = {
  lists: List[];
  setLists: (data: List[]) => void;
  addList: (newList: List) => void;
  removeList: (listId: number) => void;
  currentList: number;
  setCurrentList: (listId: number) => void;
};

const useStore = create<StoreType>((set) => ({
  lists: [],
  setLists: (data) => set({ lists: data }),
  addList: (newList) => set((state) => ({ lists: [...state.lists, newList] })),
  removeList: (listId) =>
    set((state) => ({
      lists: filter(state.lists, (list) => list.id !== listId),
    })),
  currentList: 1,
  setCurrentList: (listId) => set({ currentList: listId }),
}));

export default useStore;
