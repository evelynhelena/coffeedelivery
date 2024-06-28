import { ProductResponseProps } from './productService'

export interface ShoppingDataProps {
  id: string
  adress: {
    cepField: string
    logradouroField: string
    numberField: string
    complementField?: string
    neighborhoodField: string
    cityField: string
    stateField: string
  }
  shoppingCartData: ProductResponseProps[]
  paymentType: string
}

export interface ShoppingDataResponse {
  data: ShoppingDataProps
}
