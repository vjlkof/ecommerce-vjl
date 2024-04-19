import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/utils/types";

let cartItems: CartItem[] = [];
if (typeof window !== "undefined") {
  const cartLocal = localStorage.getItem("cartItems");
  cartItems = cartLocal ? JSON.parse(cartLocal) : [];
}

const cartsSlice = createSlice({
  name: "cart",
  initialState: {
    carts: cartItems,
    totalAmount: { currency: "", value: 0 },
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.carts.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.carts[existingIndex] = {
          ...state.carts[existingIndex],
          quantity: state.carts[existingIndex].quantity! + 1,
        };
      } else {
        let tempProductItem = {
          ...action.payload,
          quantity: 1,
        };
        state.carts.push(tempProductItem);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.carts));
      }
    },

    decreaseCart(state, action) {
      const itemIndex = state.carts.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.carts[itemIndex].quantity! > 1) {
        state.carts[itemIndex].quantity! -= 1;
      } else if (state.carts[itemIndex].quantity === 1) {
        const nextCartItems = state.carts.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.carts = nextCartItems;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.carts));
      }
    },

    removeFromCart(state, action) {
      const nextCartItems = state.carts.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.carts = nextCartItems;

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.carts));
      }
    },

    getTotals(state) {
      let { totalAmount, totalQuantity } = state.carts.reduce(
        (cartTotal, cartItem) => {
          const { amount, quantity } = cartItem;
          const itemTotal = amount.value * quantity!;

          cartTotal.totalAmount += itemTotal;
          cartTotal.totalQuantity += quantity!;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );
      totalAmount = parseFloat(totalAmount.toFixed(2));
      state.totalQuantity = totalQuantity;
      state.totalAmount.value = totalAmount;
      state.totalAmount.currency = "ARS";
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals } =
  cartsSlice.actions;
export default cartsSlice.reducer;
