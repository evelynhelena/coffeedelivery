import { ImagsListProps } from '../components/CardProduct'

export interface ProductsTypesPropos {
  name: string
}

export interface ProductResponseProps {
  imageName: ImagsListProps
  id: number
  types: ProductsTypesPropos[]
  name: string
  description: string
  price: number
}

export interface ProductResponse {
  data: ProductResponseProps[]
}
