import { CART_ACTION_TYPES } from "../actions/types"

export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []// estado inicial

//update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {//Transfomar el estado a partir de una accion y calcular nuevo estado
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { ProductoID } = actionPayload
      const productInCartIndex = state.findIndex(item => item.ProductoID == ProductoID)

      if(productInCartIndex >= 0){
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { ProductoID } = actionPayload
      const newState = state.filter(item => item.ProductoID !== ProductoID)
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage([])
      return []
    }
  }
}