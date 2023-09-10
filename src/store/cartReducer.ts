import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface IProduct {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

interface IAddProduct extends IProduct {
  quantityInStock: number;
}

interface ICart {
  products: IProduct[];
  cartTotalProducts: number;
  cartTotalPrice: number;
}

const initialState = {
  products: [],
  cartTotalProducts: 0,
  cartTotalPrice: 0,
} as ICart;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<IAddProduct[]>) => {
      state.products = action.payload;
    },

    addProduct: (state, action: PayloadAction<IAddProduct>) => {
      const findExistingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (findExistingProduct) {
        const totalQuantity =
          action.payload.quantity + findExistingProduct.quantity;

        const isTotalQuantityUnavailable =
          totalQuantity > action.payload.quantityInStock;

        state.products = [
          ...state.products.map((product) => {
            if (product.id === findExistingProduct.id) {
              return {
                ...product,
                quantity: isTotalQuantityUnavailable
                  ? action.payload.quantityInStock
                  : totalQuantity,
                total: isTotalQuantityUnavailable
                  ? findExistingProduct.price * action.payload.quantityInStock
                  : action.payload.total + findExistingProduct.total,
              };
            }
            return product;
          }),
        ];
      } else {
        state.products = [...state.products, action.payload];
      }

      window.localStorage.setItem("cart", JSON.stringify(state.products));
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = [
        ...state.products.filter((product) => product.id !== action.payload),
      ];

      window.localStorage.setItem("cart", JSON.stringify(state.products));
    },

    clearCart: (state) => {
      state.products = [];
    },

    calculateCartTotalProducts: (state) => {
      state.cartTotalProducts = state.products.length;
    },

    calculateCartTotalPrice: (state) => {
      state.cartTotalPrice = state.products.reduce(
        (acc, current) => acc + current.total,
        0
      );
    },
  },
});

export const {
  addProducts,
  addProduct,
  removeProduct,
  clearCart,
  calculateCartTotalProducts,
  calculateCartTotalPrice,
} = cartSlice.actions;

const selectProducts = (state: RootState) => state.cart.products;

const selectCartTotalProducts = (state: RootState) =>
  state.cart.cartTotalProducts;

const selectCartTotalPrice = (state: RootState) => state.cart.cartTotalPrice;

export const stateSelectors = {
  selectProducts,
  selectCartTotalProducts,
  selectCartTotalPrice,
};

export default cartSlice.reducer;
