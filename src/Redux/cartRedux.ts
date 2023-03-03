import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  inStock: boolean;
  brand: string;
  color: string[];
  size: string[];
  quantity: number;
  inventory: number;
}
interface CartState {
  products: ProductType[];
  total: number;
  subAmount: number;
  totalAmount: number;
  tax: number;
  shipPrice: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
  subAmount: 0,
  totalAmount: 0,
  tax: 0,
  shipPrice: 0,
};

function calculateShipPrice(totalAmount: number): number {
  return totalAmount >= 50 ? 0 : 2.99;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      const item = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === item.id
      );
      if (existingProduct) {
        if (existingProduct.quantity < item.inventory) {
          state.products = state.products.map((product) =>
            product.id === item.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          );
        } else {
          state.products = state.products.map((product) =>
            product.id === item.id
              ? { ...product, quantity: item.inventory }
              : product
          );
        }
      } else {
        if (item.inStock && item.inventory > 0) {
          state.products.push({ ...item, quantity: 1 });
        }
      }
    },
    getCartProducts: (state) => {
      return state;
    },
    getCartCount: (state) => {
      const cartCount = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      state.total = cartCount;
    },
    getSubTotal: (state) => {
      state.subAmount = state.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      const product = state.products[index];
      if (product && product.quantity < product.inventory) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      const product = state.products[index];
      if (product.quantity > 0) {
        product.quantity -= 1;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    getTotalAmount: (state) => {
      state.shipPrice = calculateShipPrice(state.totalAmount);
      state.totalAmount = state.subAmount + state.shipPrice;
    },
  },
});

export const {
  getTotalAmount,
  addProduct,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  getCartProducts,
  getCartCount,
  getSubTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
