// Libraries
import create from "zustand";

// Types
import { User } from "../../types";

type StoreType = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
};

const useStore = create<StoreType>((set) => ({
  users: [],
  setUsers: (users) => {
    set(() => ({ users }));
  },
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
}));

export default useStore;
