import { Box, Flex, Text } from '@radix-ui/themes'
import { currencyFormat } from '../../utils/format'
import { imagsList } from '../../utils/imageList'
import { ProductResponseProps } from '../../types/productService'
import { useState } from 'react'
import { Minus, Plus, Trash } from 'phosphor-react'
import './index.scss'

interface ShoppingCartDataProps extends ProductResponseProps {
  count: number
}

interface CardProductSelectedProps {
  product: ShoppingCartDataProps
}

export function CardProductSelected({ product }: CardProductSelectedProps) {
  const [countProduct, setCountProduct] = useState<number>(0)

  return (
    <Box key={product.id} className="content-card-product-selected">
      <Flex gap="3" align="center">
        <Box>
          <img src={imagsList[product.imageName]} alt={product.description} />
        </Box>

        <Box width="100%">
          <Flex justify="between">
            <Text className="name-product">{product.name}</Text>
            <Text className="price-product">
              R$ {currencyFormat(product.price)}
            </Text>
          </Flex>

          <Box mt="3">
            <Flex gap="3">
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

              <Flex className="btn-remove" gap="1" align="center">
                <Trash className="icon-tash" size={16} />
                <Text>REMOVER</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
