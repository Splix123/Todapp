export type User = {
  id: number;
  name: string;
  avatar?: string;
};

export type List = {
  id: number;
  label: string;
  icon: number;
};

export type Task = {
  id: number;
  title: string;
  checked: boolean;
};

export type Snackbar = {
  open?: boolean;
  severity: "success" | "info" | "error" | "warning";
  text: string;
};
export default types.d;
