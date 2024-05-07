import { Box, Flex, Button, Text } from '@radix-ui/themes'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import './index.scss'
import { useState } from 'react'

interface CardProductProps {
  image: string
}

export function CardProduct({ image }: CardProductProps) {
  const [countProduct, setCountProduct] = useState<number>(0)

  return (
    <Box className="box-product">
      <img src={image} alt="Xicará de café tradicional" />
      <Box p="5" className="content-infos">
        <Box className="label-coffee-type">
          <Text size="1">Tradicional</Text>
        </Box>
        <Box>
          <Text className="baloo-2-extra-bold coffee-name" size="4">
            Expresso Tradicional
          </Text>
        </Box>
        <Box>
          <Text className="label-text-info" size="1">
            O tradicional café feito com água quente e grãos moídos
          </Text>
        </Box>

        <Flex justify="between" align="center" mt="4">
          <Box className="label-price">
            <Text size="1">R$</Text>{' '}
            <Text className="baloo-2-extra-bold" size="6">
              9,90
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
