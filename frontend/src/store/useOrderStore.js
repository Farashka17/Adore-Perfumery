// useOrdersStore.js (Global state)

import { create } from "zustand";


export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  clearOrders: () => set({ orders: [] }), // Siparişleri sıfırlamak için fonksiyon
}));
