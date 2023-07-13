import { IUser } from '../../entities/user'
import { ActionType } from '../action-types'

interface SignUpAction {
  type: ActionType.AUTH_USER
  payload: string
}

interface SignInAction {
  type: ActionType.AUTH_USER
  payload: string
}

interface SignOutAction {
  type: ActionType.AUTH_USER
  payload: string
}

interface GetUsersAction {
  type: ActionType.GET_USERS
  payload: IUser[]
}

interface CreateUserAction {
  type: ActionType.CREATE_USER
  payload: IUser
}

interface UpdateUserAction {
  type: ActionType.UPDATE_USER
  payload: IUser
}

interface DeleteUserAction {
  type: ActionType.DELETE_USER
  payload: IUser
}

interface IsErrorAction {
  type: ActionType.IS_ERROR
  payload: boolean
}

interface IsLoadingAction {
  type: ActionType.IS_LOADING
  payload: boolean
}

interface ErrorAction {
  type: ActionType.ERROR
  payload: string
}

interface ErrorClearAction {
  type: ActionType.ERROR_CLEAR
  payload: string
}

export type Action =
  | SignUpAction
  | SignInAction
  | SignOutAction
  | GetUsersAction
  | CreateUserAction
  | UpdateUserAction
  | DeleteUserAction
  | IsErrorAction
  | IsLoadingAction
  | ErrorAction
  | ErrorClearAction
