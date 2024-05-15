import { ProductResponse, ProductResponseProps } from '../types/productService'
import api from './Api'

export const productService = {
  getPrducts: async function (): Promise<ProductResponseProps[]> {
    const { data }: ProductResponse = await api.get('/products')
    return data
  },
}
