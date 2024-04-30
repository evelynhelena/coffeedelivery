import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import './index.scss'
import ImageCoffee from '../../assets/Imagem-coffee.png'
export function Home() {
  return (
    <Box className="home-contet" mt="9">
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
              <Text size="3">Compra simples e segura</Text>
              <Text size="3">Embalagem mantém o café intacto</Text>
              <Text size="3">Entrega rápida e rastreada</Text>
              <Text size="3">O café chega fresquinho até você</Text>
            </Grid>
          </Flex>
        </Box>
        <Box>
          <img src={ImageCoffee} alt="Imagem de um copo de café" />
        </Box>
      </Flex>
    </Box>
  )
}
