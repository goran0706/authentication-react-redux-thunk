import { AxiosRequestConfig } from 'axios'
import apiClient from '../api/api-client'

interface Entity {
  _id: number | string
}

class HttpService {
  constructor(public endpoint: string) {}

  getAll<T>(config: AxiosRequestConfig) {
    const controller = new AbortController()
    const signal = controller.signal
    const cancel = () => controller.abort()
    const request = apiClient.get<T[]>(this.endpoint, { ...config, signal })
    return { request, cancel }
  }

  get<T>(config: AxiosRequestConfig) {
    const controller = new AbortController()
    const signal = controller.signal
    const cancel = () => controller.abort()
    const request = apiClient.get<T>(this.endpoint, { ...config, signal })
    return { request, cancel }
  }

  create<T extends Entity>(entity: T, config: AxiosRequestConfig) {
    return apiClient.post<T>(this.endpoint, entity, config)
  }

  update<T extends Entity>(entity: T, config: AxiosRequestConfig) {
    return apiClient.put<T>(`${this.endpoint}/${entity._id}`, entity, config)
  }

  delete<T extends Entity>(entity: T, config: AxiosRequestConfig) {
    return apiClient.delete<T>(`${this.endpoint}/${entity._id}`, config)
  }
}

const create = (endpoint: string) => new HttpService(endpoint)

export default create
