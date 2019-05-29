import axios from 'axios'
import { BASE_URL } from './constants'


export const getTOKEN = () => localStorage.getItem('token')


export const services = axios.create({
  baseURL: BASE_URL,
})


export const authServices = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: localStorage.getItem('token') }
})
