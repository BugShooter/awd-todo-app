import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
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
      setCountingTasks: (newCountingTasks) => set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: () => {
        const count = countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        set({ countCompletedTasks: count });
      },

      setActiveTasks: () => {
        const countCompleted = countingTasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
        const active = countingTasks.length - countCompleted;
        set({ countActiveTasks: active });
      },
    }),


    {
      name: "task-tango-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
