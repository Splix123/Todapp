// Libraries
import create from "zustand";
import { filter, reject } from "lodash";

// Types
import { Task } from "../../types";

type StoreType = {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  addTask: (newTask: Task) => void;
  removeTask: (taskId: number) => void;
  changeTask: (taskId: number, newTitle: string) => void;
  checkTask: (taskId: number) => void;
  checkAllTasks: (checked: boolean) => void;
  deleteCheckedTasks: () => void;
};

const useStore = create<StoreType>((set) => ({
  tasks: [],
  setTasks: (data) => set({ tasks: data }),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: filter(state.tasks, (task) => task.id !== taskId),
    })),
  changeTask: (taskId, newTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    })),
  checkTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      ),
    })),
  checkAllTasks: (checked) =>
    set((state) => ({
      tasks: state.tasks.map((task) => ({ ...task, checked: checked })),
    })),
  deleteCheckedTasks: () =>
    set((state) => ({
      tasks: reject(state.tasks, { checked: true }),
    })),
}));

export default useStore;
