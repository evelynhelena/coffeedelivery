import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Header } from '../../components/Header'
import './index.scss'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { useState } from 'react'
import { CardProductSelected } from '../../components/CardProductSelected'

export function Shopping() {
  const [paymentTypeSelect, setPaymentTypeSelect] = useState<
    'CREDIT' | 'DEBIT' | 'MONEY' | undefined
  >()

  const { shoppingCartData } = useShoppingCart()

  console.log(shoppingCartData)

  return (
    <>
      <Header />
      <Box className="mw-1120 content-shopping">
        <Flex gap="6">
          <Box>
            <Box flexGrow="1">
              <Text className="baloo-2-extra-bold subtitle" size="4">
                Complete seu pedido
              </Text>

              <Box className="box-adress" mt="5">
                <Flex direction="column" gap="3">
                  <Box>
                    <Flex gap="2">
                      <Box>
                        <MapPinLine className="color-map-icon" size={20} />
                      </Box>
                      <Box>
                        <Flex direction="column">
                          <Text className="title">Endereço de Entrega</Text>
                          <Text className="subtitle-box">
                            Informe o endereço onde deseja receber seu pedido
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                  <Box className="box-textField">
                    <Flex direction="column" gap="5">
                      <TextField.Root
                        className="text-field"
                        size="3"
                        placeholder="CEP"
                      />
                      <TextField.Root
                        className="text-field"
                        size="3"
                        placeholder="Rua"
                      />

                      <Flex gap="2">
                        <TextField.Root
                          className="smalltext-field text-field"
                          size="3"
                          placeholder="Número"
                        />
                        <TextField.Root
                          className="big-text-field text-field"
                          size="3"
                          placeholder="Complemento"
                        >
                          <TextField.Slot
                            side="right"
                            className="slot-textfield"
                          >
                            Opcional
                          </TextField.Slot>
                        </TextField.Root>
                      </Flex>

                      <Flex gap="2" justify="between">
                        <Box>
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="Número"
                          />
                        </Box>
                        <Box width="276px">
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="Complemento"
                          />
                        </Box>
                        <Box width="60px">
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="UF"
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box className="box-payment-type" mt="5">
              <Flex gap="2">
                <Box>
                  <CurrencyDollar className="color-icons" size={20} />
                </Box>
                <Box>
                  <Flex direction="column">
                    <Text className="title">Pagamento</Text>
                    <Text className="subtitle-box">
                      O pagamento é feito na entrega. Escolha a forma que deseja
                      pagar
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Flex mt="5" justify="between">
                <Box
                  className={`btn-payment-type ${paymentTypeSelect === 'CREDIT' && 'selected'}`}
                  onClick={() => setPaymentTypeSelect('CREDIT')}
                >
                  <Flex gap="2" align="center">
                    <CreditCard className="color-icons" size={20} />
                    <Text className="payment-type-text">Cartão de crédito</Text>
                  </Flex>
                </Box>
                <Box
                  className={`btn-payment-type ${paymentTypeSelect === 'DEBIT' && 'selected'}`}
                  onClick={() => setPaymentTypeSelect('DEBIT')}
                >
                  <Flex gap="2" align="center">
                    <Bank className="color-icons" size={20} />
                    <Text className="payment-type-text">cartão de débito</Text>
                  </Flex>
                </Box>
                <Box
                  className={`btn-payment-type ${paymentTypeSelect === 'MONEY' && 'selected'}`}
                  onClick={() => setPaymentTypeSelect('MONEY')}
                >
                  <Flex gap="2" align="center">
                    <Money className="color-icons" size={20} />
                    <Text className="payment-type-text">dinheiro</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box flexGrow="0" width="448px">
            <Text className="baloo-2-extra-bold subtitle" size="4">
              Cafés selecionados
            </Text>
            <Flex
              mt="5"
              className="box-products-selected"
              direction="column"
              gap="4"
            >
              <Flex
                maxHeight="370px"
                className="scroller"
                direction="column"
                gap="3"
              >
                {shoppingCartData.map((product) => (
                  <Flex key={product.id} direction="column" gap="4" pr="3">
                    <CardProductSelected product={product} />
                    <Box className="divider" />
                  </Flex>
                ))}
              </Flex>

              <Flex direction="column" gap="4">
                <Flex justify="between">
                  <Text className="color-info">Total de itens</Text>
                  <Text className="color-info">R$ 29,70</Text>
                </Flex>
                <Flex justify="between">
                  <Text className="color-info">Entrega</Text>
                  <Text className="color-info">R$ 29,70</Text>
                </Flex>
                <Flex justify="between">
                  <Text size="5" weight="bold" className="color-total">
                    Total
                  </Text>
                  <Text size="5" weight="bold" className="color-total">
                    R$ 33,20
                  </Text>
                </Flex>
                <Button size="3" variant="soft" className="btn-confirm">
                  confirmar pedido
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
