import { ActionType } from '../action-types'
import { Action } from '../actions'

interface AuthState {
  token: string
  error: string
  isError: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  token: localStorage.getItem('token') as string,
  error: '',
  isError: false,
  isLoading: false
}

const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return { ...state, token: action.payload }
    case ActionType.IS_ERROR:
      return { ...state, isError: action.payload }
    case ActionType.IS_LOADING:
      return { ...state, isLoading: action.payload }
    case ActionType.ERROR:
      return { ...state, error: action.payload }
    case ActionType.ERROR_CLEAR:
      return { ...state, error: '', isError: false }
    default:
      return state
  }
}

export default authReducer
