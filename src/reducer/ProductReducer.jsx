import { GET_PRODUCTS } from "../actions/types";

export const initialState = {
    products: []
}

export const productReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
