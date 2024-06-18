import { Box, Flex, Text } from '@radix-ui/themes'
import { Header } from '../../components/Header'
import './index.scss'
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import Image from '../../assets/Illustration.svg'
export function EndPage() {
  return (
    <>
      <Header />
      <Box className="mw-1120 content-end-page" mb="5" mt="9">
        <Flex direction="column" gap="3">
          <Text size="8" className="baloo-2-extra-bold title">
            Uhu! Pedido confirmado
          </Text>
          <Text size="5">
            Agora é só aguardar que logo o café chegará até você
          </Text>
        </Flex>

        <Box mt="9" className="box-info-send">
          <Flex className="gap-100">
            <Flex direction="column" gap="5" className="border-linear">
              <Flex align="center" gap="4">
                <Flex className="pourple cicle-icon" justify="center" p="2">
                  <MapPin size={20} weight="fill" />
                </Flex>
                <Flex direction="column">
                  <Text className="text-info">
                    Entrega em <strong>Rua João Daniel Martinelli, 102</strong>
                  </Text>
                  <Text className="text-info">Farrapos - Porto Alegre, RS</Text>
                </Flex>
              </Flex>

              <Flex align="center" gap="4">
                <Flex className="yellow cicle-icon" justify="center" p="2">
                  <Timer size={20} weight="fill" />
                </Flex>
                <Flex direction="column">
                  <Text className="text-info">Previsão de entrega</Text>
                  <Text className="text-info">
                    <strong>20 min - 30 min</strong>
                  </Text>
                </Flex>
              </Flex>

              <Flex align="center" gap="4">
                <Flex className="yellow-dark cicle-icon" justify="center" p="2">
                  <CurrencyDollar size={20} />
                </Flex>
                <Flex direction="column">
                  <Text className="text-info">Pagamento na entrega</Text>
                  <Text className="text-info">
                    <strong>Cartão de Crédito</strong>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Box>
              <img src={Image} alt="Imagem de um cara em cima de uma moto" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
