import { IUser } from '../../entities/user'
import { ActionType } from '../action-types'
import { Action } from '../actions'

interface UserState {
  users: IUser[]
  error: string
  isError: boolean
  isLoading: boolean
}

const initialState: UserState = {
  users: [],
  error: '',
  isError: false,
  isLoading: false
}

const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.GET_USERS:
      return { ...state, users: action.payload }
    case ActionType.CREATE_USER:
      return { ...state, users: [...state.users, action.payload] }
    case ActionType.UPDATE_USER: {
      const user = action.payload
      const users = state.users.map((u) => (u._id === user._id ? user : u))
      return { ...state, users }
    }
    case ActionType.DELETE_USER: {
      const user = action.payload
      const users = state.users.filter((u) => u._id !== user._id)
      return { ...state, users }
    }
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

export default userReducer
