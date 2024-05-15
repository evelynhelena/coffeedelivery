import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import './index.scss'
import ImageCoffee from '../../assets/Imagem-coffee.svg'
import ImageCoffee01 from '../../assets/01-Image-coffee.svg'
import { InfoBenefits } from '../../components/InfoBenefits'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { CardProduct } from '../../components/CardProduct'
import { useEffect, useState } from 'react'
import { productService } from '../../services/product'
import { ProductResponseProps } from '../../types/productService'
export function Home() {
  const [listProducts, setListProducts] = useState<ProductResponseProps[]>([])

  const fetchProducts = async () => {
    try {
      const data = await productService.getPrducts()
      setListProducts(data)
    } catch {
      console.log('ERRO')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Box className="home-contet" mt="9">
      <Box className="bg-image">
        <Flex className="mw-1120" justify="between" align="center" gap="9">
          <Box>
            <Flex direction="column" gap="4">
              <Text className="font-large baloo-2-extra-bold">
                Encontre o café perfeito para qualquer hora do dia
              </Text>
              <Text size="5">
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </Text>

              <Grid columns="2" gap="3" rows="repeat(2)" width="auto" mt="9">
                <InfoBenefits
                  label="Compra simples e segura"
                  icon={<ShoppingCart size={16} weight="fill" />}
                  color="yellow-dark"
                />
                <InfoBenefits
                  label="Embalagem mantém o café intacto"
                  icon={<Package size={16} weight="fill" />}
                  color="gray-700"
                />
                <InfoBenefits
                  label="Entrega rápida e rastreada"
                  icon={<Timer size={16} weight="fill" />}
                  color="yellow"
                />
                <InfoBenefits
                  label="O café chega fresquinho até você"
                  icon={<Coffee size={16} weight="fill" />}
                  color="purple"
                />
              </Grid>
            </Flex>
          </Box>
          <Box>
            <img src={ImageCoffee} alt="Imagem de um copo de café" />
          </Box>
        </Flex>
      </Box>
      <Box className="mw-1120 mt-120">
        <Text className="baloo-2-extra-bold" size="7">
          Nossos cafés
        </Text>

        <Grid columns="4" gap="3" rows="repeat(4)" width="auto" mt="9">
          {listProducts &&
            listProducts.length > 0 &&
            listProducts.map((p) => (
              <CardProduct
                types={p.types}
                name={p.name}
                description={p.description}
                price={p.price}
                key={p.id}
                image={ImageCoffee01}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
