import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'https://chombueng-selection.vercel.app'

const authHeader = (token) => token ? { Authorization: `Bearer ${token}` } : {}

export const getOverview   = (token, params) => axios.get(`${BASE_URL}/api/stats/overview`,   { headers: authHeader(token), params })
export const getSales      = (token, params) => axios.get(`${BASE_URL}/api/stats/sales`,      { headers: authHeader(token), params })
export const getTopProduct = (token, params) => axios.get(`${BASE_URL}/api/stats/top-products`, { headers: authHeader(token), params })
export const getByCategory = (token, params) => axios.get(`${BASE_URL}/api/stats/by-category`,  { headers: authHeader(token), params })