import { Box, Flex, Button, Text } from '@radix-ui/themes'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import './index.scss'
import { useState } from 'react'
import { ProductResponseProps } from '../../types/productService'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { currencyFormat } from '../../utils/format'
import { imagsList } from '../../utils/imageList'

interface CardProductProps {
  product: ProductResponseProps
}

export function CardProduct({ product }: CardProductProps) {
  const { getProduct } = useShoppingCart()

  const [countProduct, setCountProduct] = useState<number>(0)

  return (
    <Box className="box-product">
      <img src={imagsList[product.imageName]} alt={product.description} />
      <Box p="5" className="content-infos">
        <Flex className="label-coffee-type" gap="2">
          {product.types.map((t, index) => (
            <Text size="1" key={index}>
              {t.name.toUpperCase()}
            </Text>
          ))}
        </Flex>
        <Box>
          <Text className="baloo-2-extra-bold coffee-name" size="4">
            {product.name}
          </Text>
        </Box>
        <Box>
          <Text className="label-text-info" size="1">
            {product.description}
          </Text>
        </Box>

        <Flex justify="between" align="center" mt="4">
          <Box className="label-price">
            <Text size="1">R$</Text>{' '}
            <Text className="baloo-2-extra-bold" size="6">
              {currencyFormat(product.price)}
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

          <Button
            className={`btn-cart ${countProduct === 0 && 'disabled'}`}
            disabled={countProduct <= 0}
            onClick={() =>
              countProduct > 0 && getProduct(product.id, countProduct)
            }
          >
            <ShoppingCart size={22} weight="fill" />
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
