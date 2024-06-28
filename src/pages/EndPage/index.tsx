import { Box, Flex, Text } from '@radix-ui/themes'
import { Header } from '../../components/Header'
import './index.scss'
import { CheckCircle, CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import Image from '../../assets/Illustration.svg'
import { useEffect, useState } from 'react'
import { shoppingService } from '../../services/shopping'
import { ShoppingDataProps } from '../../types/shoppingService'
import { Alert } from '../../components/Alert'
import { useShoppingCart } from '../../hooks/useShoppingCart'
export function EndPage() {
  const [dataBuy, setDataBuy] = useState<ShoppingDataProps>()
  const [open, setOpen] = useState<boolean>(false)
  const [buyTipe, setBuyTipe] = useState<string>('')
  const { setShoppingCartData } = useShoppingCart()

  const fetchDataBuy = async () => {
    try {
      const data = await shoppingService.getBuyById('1')
      switch (data.paymentType) {
        case 'CREDIT':
          setBuyTipe('Cartão de Crédito')
          break
        case 'DEBIT':
          setBuyTipe('Cartão de Débito')
          break
        default:
          setBuyTipe('Dinheiro')
          break
      }
      setDataBuy(data)
    } catch {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500)
    }
  }

  useEffect(() => {
    fetchDataBuy()
    setShoppingCartData([])
  }, [])

  return (
    <>
      {open && (
        <Alert
          icon={<CheckCircle size={20} />}
          title="Erro ao realizar compra"
          type="error"
        />
      )}
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
                    Entrega em{' '}
                    <strong>
                      {`${dataBuy?.adress.logradouroField} ${dataBuy?.adress.numberField}`}
                    </strong>
                  </Text>
                  <Text className="text-info">
                    {`${dataBuy?.adress.cityField} - ${dataBuy?.adress.neighborhoodField}, ${dataBuy?.adress.stateField}`}
                    {dataBuy?.adress.complementField
                      ? ` - ${dataBuy?.adress.complementField}`
                      : ''}
                  </Text>
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
                    <strong>{buyTipe}</strong>
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
