export interface ProductsTypesPropos {
  name: string
}

export interface ProductResponseProps {
  id: number
  types: ProductsTypesPropos[]
  name: string
  description: string
  price: number
}

export interface ProductResponse {
  data: ProductResponseProps[]
}
