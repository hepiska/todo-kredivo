import axios from 'axios'
import { BASE_URL } from './constants'


export const getTOKEN = () => localStorage.getItem('token')


export const services = axios.create({
  baseURL: BASE_URL,
})


export const authServices = axios.create({
  baseURL: BASE_URL,
  transformRequest: [function (data, headers) {
    headers.authorization = localStorage.getItem('token')
    return JSON.stringify(data)
  }],
  headers: {
    'Content-Type': 'application/json'
  }
})
