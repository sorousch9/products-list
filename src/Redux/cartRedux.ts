import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AddProductPayload {
  item: ProductType;
}

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
  products: Array<ProductType>;
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
    addProduct: {
      reducer: (state, action: PayloadAction<AddProductPayload>) => {
        const { item } = action.payload;
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
      prepare: (item: ProductType) => {
        return { payload: { item } };
      },
    },
    getCartProducts: (state) => {
      return {
        ...state,
      };
    },
    getCartCount: (state) => {
      const cartCount = state.products.reduce((total, product) => {
        return product.quantity + total;
      }, 0);
      state.total = cartCount;
    },
    getSubTotal: (state) => {
      state.subAmount = state.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    },
    incrementQuantity: (state, action) => {
      const { id, maxQuantity } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product && product.quantity < maxQuantity) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (state.products[index].quantity <= 0) {
        state.products[index].quantity = 0;
      } else {
        state.products[index].quantity -= 1;
      }
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    getTotalAmount: (state) => {
      state.totalAmount = state.subAmount + state.shipPrice;
      state.shipPrice = calculateShipPrice(state.totalAmount);
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
