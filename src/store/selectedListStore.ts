import { create } from "zustand";

const useStore = create((set) => ({
  index: 1,
  name: "",
  setIndex: () => set(),
}));

export default useStore;
