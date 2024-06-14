import { ImagsListProps } from '../utils/imageList'

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
export interface ProductByIdResponse {
  data: ProductResponseProps
}
