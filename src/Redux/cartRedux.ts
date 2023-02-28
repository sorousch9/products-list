import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

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
  tax: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
  subAmount: 0,
  totalAmount: 0,
  tax: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action: PayloadAction<Item>) => {
        const cartIndex = state.products.findIndex(
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
      state.total = state.products.reduce((total, product) => {
        return product.quantity + total;
      }, 0);
    },
    getSubTotal: (state) => {
      state.subAmount = state.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    },
    incrementQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      produce(state, (draftState) => {
        draftState.products[index].quantity += 1;
      });
    },
    decrementQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      produce(state, (draftState) => {
        if (draftState.products[index].quantity <= 0) {
          draftState.products[index].quantity = 0;
        } else {
          draftState.products[index].quantity -= 1;
        }
      });
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        produce(state, (draftState) => {
          draftState.products.splice(index, 1);
        });
      }
    },
    getTotalAmount: (state) => {
      state.totalAmount = state.subAmount + 3.5;
    },
    calculateTax: (state) => {
      state.tax = (19 / 100) * state.subAmount;
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
