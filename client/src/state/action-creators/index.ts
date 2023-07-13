import { AxiosError, CanceledError } from 'axios'
import { Dispatch } from 'redux'
import { IUser } from '../../entities/user'
import authService, { AuthResponse } from '../../services/auth-service'
import userService from '../../services/user-service'
import { ActionType } from '../action-types'
import { Action } from '../actions'

// TODO: too many despatches here

export const signUp = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: ActionType.IS_LOADING, payload: true })
      const response = await authService.signUp(email, password)
      localStorage.setItem('token', response.data.token)
      dispatch({ type: ActionType.AUTH_USER, payload: response.data.token })
      dispatch({ type: ActionType.ERROR_CLEAR, payload: '' })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: ActionType.ERROR, payload: err.message })
      }
      if (err instanceof AxiosError) {
        const data = err.response?.data as AuthResponse
        const _error = data?.message || (data as unknown as string)
        dispatch({ type: ActionType.ERROR, payload: _error })
      }
      dispatch({ type: ActionType.IS_ERROR, payload: true })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      dispatch({ type: ActionType.AUTH_USER, payload: '' })
    }
  }
}

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: ActionType.IS_LOADING, payload: true })
      const response = await authService.signIn(email, password)
      localStorage.setItem('token', response.data.token)
      dispatch({ type: ActionType.AUTH_USER, payload: response.data.token })
      dispatch({ type: ActionType.ERROR_CLEAR, payload: '' })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: ActionType.ERROR, payload: err.message })
      }
      if (err instanceof AxiosError) {
        const data = err.response?.data as AuthResponse
        const _error = data?.message || (data as unknown as string)
        dispatch({ type: ActionType.ERROR, payload: _error })
      }
      dispatch({ type: ActionType.IS_ERROR, payload: true })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      dispatch({ type: ActionType.AUTH_USER, payload: '' })
    }
  }
}

export const signOut = () => {
  localStorage.removeItem('token')
  return { type: ActionType.AUTH_USER, payload: '' }
}

export const getUsers = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.IS_LOADING, payload: true })
  const { request, cancel } = userService.getAll<IUser>()
  request
    .then((res) => {
      dispatch({ type: ActionType.GET_USERS, payload: res.data })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    })
    .catch((err) => {
      if (err instanceof CanceledError) return
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        dispatch({ type: ActionType.ERROR, payload: _error })
        dispatch({ type: ActionType.IS_ERROR, payload: true })
        dispatch({ type: ActionType.IS_LOADING, payload: false })
      } else {
        throw err
      }
    })
  return () => cancel()
}

export const createUser = (user: IUser) => (dispatch: Dispatch<Action>) => {
  userService
    .create(user)
    .then((res) => {
      dispatch({ type: ActionType.CREATE_USER, payload: res.data })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        dispatch({ type: ActionType.ERROR, payload: _error })
        dispatch({ type: ActionType.IS_ERROR, payload: true })
        dispatch({ type: ActionType.IS_LOADING, payload: false })
      } else {
        throw err
      }
    })
}

export const updateUser = (user: IUser) => (dispatch: Dispatch<Action>) => {
  userService
    .update(user)
    .then((res) => {
      dispatch({ type: ActionType.UPDATE_USER, payload: res.data })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        dispatch({ type: ActionType.ERROR, payload: _error })
        dispatch({ type: ActionType.IS_ERROR, payload: true })
        dispatch({ type: ActionType.IS_LOADING, payload: false })
      } else {
        throw err
      }
    })
}

export const deleteUser = (user: IUser) => (dispatch: Dispatch<Action>) => {
  userService
    .delete(user)
    .then((res) => {
      dispatch({ type: ActionType.DELETE_USER, payload: res.data })
      dispatch({ type: ActionType.IS_ERROR, payload: false })
      dispatch({ type: ActionType.IS_LOADING, payload: false })
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        dispatch({ type: ActionType.ERROR, payload: _error })
        dispatch({ type: ActionType.IS_ERROR, payload: true })
        dispatch({ type: ActionType.IS_LOADING, payload: false })
      } else {
        throw err
      }
    })
}
