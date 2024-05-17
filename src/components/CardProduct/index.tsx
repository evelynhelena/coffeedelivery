import { Box, Flex, Button, Text } from '@radix-ui/themes'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import './index.scss'
import { useState } from 'react'
import { ProductsTypesPropos } from '../../types/productService'
import ImageCoffee01 from '../../assets/01-Image-coffee.svg'
import ImageCoffee02 from '../../assets/02-Image-coffee.svg'
import ImageCoffee03 from '../../assets/03-Image-coffee.svg'
import ImageCoffee04 from '../../assets/04-Image-coffee.svg'
import ImageCoffee05 from '../../assets/05-Image-coffee.svg'
import ImageCoffee06 from '../../assets/06-Image-coffee.svg'
import ImageCoffee07 from '../../assets/07-Image-coffee.svg'
import ImageCoffee08 from '../../assets/08-Image-coffee.svg'
import ImageCoffee09 from '../../assets/09-Image-coffee.svg'
import ImageCoffee10 from '../../assets/10-Image-coffee.svg'
import ImageCoffee11 from '../../assets/11-Image-coffee.svg'
import ImageCoffee12 from '../../assets/12-Image-coffee.svg'
import ImageCoffee13 from '../../assets/13-Image-coffee.svg'
import ImageCoffee14 from '../../assets/14-Image-coffee.svg'

const imagsList = {
  '01-Image-coffee': ImageCoffee01,
  '02-Image-coffee': ImageCoffee02,
  '03-Image-coffee': ImageCoffee03,
  '04-Image-coffee': ImageCoffee04,
  '05-Image-coffee': ImageCoffee05,
  '06-Image-coffee': ImageCoffee06,
  '07-Image-coffee': ImageCoffee07,
  '08-Image-coffee': ImageCoffee08,
  '09-Image-coffee': ImageCoffee09,
  '10-Image-coffee': ImageCoffee10,
  '11-Image-coffee': ImageCoffee11,
  '12-Image-coffee': ImageCoffee12,
  '13-Image-coffee': ImageCoffee13,
  '14-Image-coffee': ImageCoffee14,
}

export type ImagsListProps = keyof typeof imagsList
interface CardProductProps {
  imageName: ImagsListProps
  types: ProductsTypesPropos[]
  name: string
  description: string
  price: number
}

export function CardProduct({
  imageName,
  name,
  description,
  types,
  price,
}: CardProductProps) {
  const [countProduct, setCountProduct] = useState<number>(0)

  return (
    <Box className="box-product">
      <img src={imagsList[imageName]} alt={description}></img>
      <Box p="5" className="content-infos">
        <Flex className="label-coffee-type" gap="2">
          {types.map((t, index) => (
            <Text size="1" key={index}>
              {t.name.toUpperCase()}
            </Text>
          ))}
        </Flex>
        <Box>
          <Text className="baloo-2-extra-bold coffee-name" size="4">
            {name}
          </Text>
        </Box>
        <Box>
          <Text className="label-text-info" size="1">
            {description}
          </Text>
        </Box>

        <Flex justify="between" align="center" mt="4">
          <Box className="label-price">
            <Text size="1">R$</Text>{' '}
            <Text className="baloo-2-extra-bold" size="6">
              {price}
            </Text>
          </Box>

          <Flex className="btn-more-less" align="center" gap="3">
            <Minus
              size={16}
              className={`color-icon ${countProduct === 0 && 'disabled'} `}
              weight="bold"
              onClick={() =>
                countProduct > 0 && setCountProduct(countProduct - 1)
              }
            />
            <Box>
              <Text>{countProduct}</Text>
            </Box>

            <Plus
              size={16}
              className="color-icon"
              weight="bold"
              onClick={() => setCountProduct(countProduct + 1)}
            />
          </Flex>

          <Button className="btn-cart">
            <ShoppingCart size={22} weight="fill" />
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
