import { create } from 'zustand';

const useStore = create((set) => ({
  selectedFilters: {},
  products: [],
  

  setFilter: (filterType, value) => set((state) => {
    const updatedFilters = { ...state.selectedFilters };

    if (value) {
      updatedFilters[filterType] = value; 
    } else {
      delete updatedFilters[filterType]; 
    }

    return { selectedFilters: updatedFilters }; 
  }),
  
  
  fetchFilteredProducts: async () => {
    const { selectedFilters } = useStore.getState();
    const queryParams = new URLSearchParams();
  
  
    Object.keys(selectedFilters).forEach((filterType) => {
      queryParams.set(filterType, selectedFilters[filterType]);
    });
  
    try {
      const response = await fetch(`http://localhost:3000/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered products');
      }
      const data = await response.json();
      set({ products: data.data || [] }); 
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  },

 
  clearFilters: () => set({
    selectedFilters: {}, 
  }),
}));

export default useStore;
