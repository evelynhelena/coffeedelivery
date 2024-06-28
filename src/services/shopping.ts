import { ShoppingDataProps } from '../types/shoppingService'
import api from './Api'

export const shoppingService = {
  getBuyById: async function (id: string): Promise<ShoppingDataProps> {
    const { data } = await api.get(`/shopping/${id}`)
    return data
  },
  createBuy: async function (data: ShoppingDataProps) {
    await api.post('/shopping', data)
  },
  updatedBuy: async function (data: ShoppingDataProps) {
    await api.put(`/shopping/${data.id}`, data)
  },
}
