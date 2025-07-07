import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ITaskStore {
  funMode: boolean,
  setupMode: boolean,
  finishSetup: () => void,
  activeList: null|string,
  setActiveList: (newActiveList: string) => void,
  searchTerm: string,
  setSearchTerm: (newSearchTerm: string) => void,
  toggleFunMode: () => void,
  countingTasks: ITask[],
  setCountingTasks: (newCountingTasks: ITask[]) => void,
  countCompletedTasks: number,
  countActiveTasks: number,

  setCountCompletedTasks: () => void,
  setActiveTasks: () => void,
}

export const useTaskStore = create<ITaskStore>()(
  persist(
    (set, get) => ({
      funMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),
      activeList: null,
      setActiveList: (newActiveList) => set({ activeList: newActiveList }),
      searchTerm: "",
      setSearchTerm: (newSearchTerm) => set({ searchTerm: newSearchTerm }),
      toggleFunMode: () =>
        set((state) => ({
          funMode: !state.funMode,
        })),
      countingTasks: [],
      setCountingTasks: (newCountingTasks: ITask[]) => set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: () => {

        const count = get().countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        set({ countCompletedTasks: count });
      },

      setActiveTasks: () => {
        const countCompleted = get().countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        const active = get().countingTasks.length - countCompleted;
        set({ countActiveTasks: active });
      },
    }),


    {
      name: "task-tango-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
