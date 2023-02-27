import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProductsT {
  products: [];
}
const initialState: ProductsT = {
  products: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action) => {
        let cartIndex = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (cartIndex >= 0) {
          //
        } else {
          state.products.push({ ...action.payload, quantity: 1 });
        }
      },
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
