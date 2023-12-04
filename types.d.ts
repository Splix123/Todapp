export type User = {
  id: number;
  name: string;
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
export default types.d;
