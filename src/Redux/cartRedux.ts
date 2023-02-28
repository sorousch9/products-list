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
}

const initialState: CartState = {
  products: [],
  total: 0
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
      }
    }
  }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;