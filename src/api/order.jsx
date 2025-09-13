import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'https://chombueng-selection.vercel.app'

export const createOrder = (payload, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.post(`${BASE_URL}/api/orders`, payload, { headers })
}

export const listOrders = (token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.get(`${BASE_URL}/api/orders`, { headers })
}

export const deleteOrder = (id, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.delete(`${BASE_URL}/api/orders/${id}`, { headers })
}

export const updateOrderItemQty = (orderId, itemId, qty, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.patch(`${BASE_URL}/api/orders/${orderId}/items/${itemId}`, { qty }, { headers })
}

export const deleteOrderItem = (orderId, itemId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.delete(`${BASE_URL}/api/orders/${orderId}/items/${itemId}`, { headers })
}
