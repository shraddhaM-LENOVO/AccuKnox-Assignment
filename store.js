import { create } from "zustand";
import { initialCategories } from "../data/data";

const useStore = create((set) => ({
  categories: initialCategories,
  addWidget: (categoryId, widget) =>
    set((state) => {
      const updatedCategories = { ...state.categories };
      updatedCategories[categoryId].widgets.push(widget);
      return { categories: updatedCategories };
    }),
  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      const updatedCategories = { ...state.categories };
      updatedCategories[categoryId].widgets = updatedCategories[
        categoryId
      ].widgets.filter((w) => w.id !== widgetId);
      return { categories: updatedCategories };
    }),
}));

export default useStore;