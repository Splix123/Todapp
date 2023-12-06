// Libraries
import create from "zustand";

// Types
import { Snackbar } from "../../types";

type StoreType = {
  open: boolean;
  severity: "success" | "info" | "error" | "warning";
  text: string;
  openSnackbar: (newSnackbar: Snackbar) => void;
};

const useStore = create<StoreType>((set) => ({
  open: false,
  severity: "success",
  text: "",
  openSnackbar: (newSnackbar) =>
    set({ open: true, severity: newSnackbar.severity, text: newSnackbar.text }),
}));

export default useStore;
