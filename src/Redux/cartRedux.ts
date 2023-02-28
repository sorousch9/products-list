import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartState {
  products: Array<Item>;
  total: number;
  subAmount: number;
  totalAmount: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
  subAmount: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action: PayloadAction<Item>) => {
        let cartIndex = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (cartIndex >= 0) {
          //
        } else {
          state.products.push({ ...action.payload, quantity: 1 });
        }
      },
      prepare: (item: Item) => {
        return { payload: item };
      },
    },
    getCartProducts: (state) => {
      return {
        ...state,
      };
    },
    getCartCount: (state) => {
      let cartCount = state.products.reduce((total, product) => {
        return product.quantity + total;
      }, 0);
      state.total = cartCount;
    },
    getSubTotal: (state) => {
      state.subAmount = state.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
