import { create } from 'zustand';

const useStore = create((set) => ({
  selectedFilters: {},
  products: [],
  
  // Filtre ayarlama fonksiyonu
  setFilter: (filterType, value) => set((state) => {
    const updatedFilters = { ...state.selectedFilters };

    if (value) {
      updatedFilters[filterType] = value; // Değer varsa filtreyi ekliyoruz
    } else {
      delete updatedFilters[filterType]; // Değer yoksa, filtreyi siliyoruz
    }

    return { selectedFilters: updatedFilters }; // Güncellenmiş filtreleri state'e kaydediyoruz
  }),
  
  // Filtrelere göre ürünleri çekme fonksiyonu
  fetchFilteredProducts: async () => {
    const { selectedFilters } = useStore.getState();
    const queryParams = new URLSearchParams();
  
    // Adding selected filters to the query parameters
    Object.keys(selectedFilters).forEach((filterType) => {
      queryParams.set(filterType, selectedFilters[filterType]);
    });
  
    try {
      const response = await fetch(`http://localhost:3000/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered products');
      }
      const data = await response.json();
      set({ products: data.data || [] }); // Store the fetched products
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  },

  // Filtreleri temizleme fonksiyonu
  clearFilters: () => set({
    selectedFilters: {}, // selectedFilters'ı sıfırlıyoruz
  }),
}));

export default useStore;
