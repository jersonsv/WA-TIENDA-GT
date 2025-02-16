import { CATEGORY_ACTION_TYPES } from "../actions/types";

export const initialState = {
  categorys: [],
  selectCategory: []
}

export const categoryReducer = (state, action) => {
  const {payload, type } = action

  switch(type) {
    case CATEGORY_ACTION_TYPES.GET_CATEGORYS:
      return {
        ...state,
        categorys: payload
      };
    case CATEGORY_ACTION_TYPES.GET_CATEGORY:
      return {
        ...state,
        selectCategory: payload
      }
    case CATEGORY_ACTION_TYPES.ADD_CATEGORY:
      return {
        ...state,
        categorys: [...state.categorys, payload]
      }
    case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY:
      return {
        ...state,
        categorys: state.categorys.map(category => 
         category.CategoriaID === payload.CategoriaID ? payload : category
        )
      }
    case CATEGORY_ACTION_TYPES.DELETE_CATEGORY:
      return {
        ...state,
        categorys: state.categorys.filter( category =>
          category.CategoriaID !== payload.CategoriaID
        )
      }
    default:
      return state;
  }
};