import { Box, Flex, Button, Text } from '@radix-ui/themes'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import './index.scss'
import { useState } from 'react'
import { ProductsTypesPropos } from '../../types/productService'

interface CardProductProps {
  image: string
  types: ProductsTypesPropos[]
  name: string
  description: string
  price: number
}

export function CardProduct({
  image,
  name,
  description,
  types,
  price,
}: CardProductProps) {
  const [countProduct, setCountProduct] = useState<number>(0)

  return (
    <Box className="box-product">
      <img src={image} alt="Xicará de café tradicional" />
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
