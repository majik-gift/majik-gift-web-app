import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
  name: "appReducer",
  initialState: {
    user: null,
    isLogged: false,
    openMenu: false,
    loader: false,
    cartCount: 0,
    toast: { message: "", open: false, type: "success",duration:5000 },
    filter: {},
    openSignUpModal: true,
    reviews: null,
    products: null,
    banners: null,
    services: null,
    loading: {
      banners: true,
      reviews: true,
      products: true,
      services: true,
    },
    quantity:1,
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.isLogged = true;
      state.user = payload;
    },
    setLogged: (state) => {
      state.isLogged = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLogged = false;
    },
    setQuantity: (state,{payload}) => {
      state.quantity = payload;
    },
    toggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
    closeMenu: (state) => {
      state.openMenu = false;
    },
    setToast: (state, { payload }) => {
      state.toast = { ...payload, open: true, duration: 3000 };
    },
    setOpenSignUpModal: (state, { payload }) => {
      state.openSignUpModal = payload;
    },
    closeToast: (state) => {
      state.toast = {
        duration: 3000,
        open: false,
        message: "",
        type: "success",
      };
    },
    handleLoader: (state, { payload }) => {
      state.loader = payload;
    },
    setCartCount: (state, { payload }) => {
      state.cartCount = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    setReviews: (state, { payload }) => {
      state.reviews = payload;
      state.loading.reviews = false;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.loading.products = false;
    },
    setBanners: (state, { payload }) => {
      state.banners = payload;
      state.loading.banners = false;
    },
    setServices: (state, { payload }) => {
      state.services = payload;
      state.loading.services = false;
    },
  },
});
export const {
  setLogged,
  setToast,
  setUser,
  logoutUser,
  handleLoader,
  removeToast,
  toggleMenu,
  setTheme,
  closeToast,
  setCartCount,
  closeMenu,
  setFilter,
  setOpenSignUpModal,
  setReviews,
  setProducts,
  setBanners,
  setServices,
  setQuantity,
} = reducer.actions;

export default reducer.reducer;
