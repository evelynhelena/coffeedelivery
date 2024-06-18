import { Box, Button, Flex, Spinner, Text, TextField } from '@radix-ui/themes'
import { Header } from '../../components/Header'
import './index.scss'
import {
  Bank,
  CheckCircle,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { useEffect, useState } from 'react'
import { CardProductSelected } from '../../components/CardProductSelected'
import { currencyFormat } from '../../utils/format'
import { cepService } from '../../services/cep'
import { Alert } from '../../components/Alert'
import { EmptyShopping } from '../../components/EmptyShopping'
import { useNavigate } from 'react-router-dom'

export function Shopping() {
  const [paymentTypeSelect, setPaymentTypeSelect] = useState<
    'CREDIT' | 'DEBIT' | 'MONEY' | undefined
  >()

  const [total, setTotal] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [cepField, setCepField] = useState<string>('')
  const [logradouroField, setLogradouroField] = useState<string>('')

  const [numberField, setNumberField] = useState<string>('')
  const [complementField, setComplementField] = useState<string>('')
  const [neighborhoodField, setNeighborhoodField] = useState<string>('')
  const [cityField, setCityField] = useState<string>('')
  const [stateField, setStateField] = useState<string>('')

  const { shoppingCartData, getProcentValue, porcentValue } = useShoppingCart()

  const prices = shoppingCartData.map((s) => s.count * s.price)
  const navigate = useNavigate()

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i]
    }

    setTotal(sum)
  }, [prices, shoppingCartData])

  useEffect(() => {
    getProcentValue()
  }, [getProcentValue])

  const handleSearchCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        setLoading(true)
        const cepData = await cepService.getCep(cep)
        setLogradouroField(cepData?.logradouro)
        setNeighborhoodField(cepData?.bairro)
        setCityField(cepData?.localidade)
        setStateField(cepData?.uf)
      } catch {
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 1500)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Header />
      {open && (
        <Alert
          icon={<CheckCircle size={20} />}
          title="Erro ao encontrar cep"
          type="error"
        />
      )}
      <Box className="mw-1120 content-shopping" mb="5" mt="9">
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
                        value={cepField}
                        onChange={({ target }) => {
                          handleSearchCep(target.value)
                          setCepField(target.value)
                        }}
                      >
                        {loading && (
                          <TextField.Slot side="right">
                            <Spinner />
                          </TextField.Slot>
                        )}
                      </TextField.Root>
                      <TextField.Root
                        className="text-field"
                        size="3"
                        placeholder="Rua"
                        value={logradouroField}
                        onChange={({ target }) =>
                          setLogradouroField(target.value)
                        }
                      />

                      <Flex gap="2">
                        <TextField.Root
                          className="smalltext-field text-field"
                          size="3"
                          placeholder="Número"
                          value={numberField}
                          onChange={({ target }) =>
                            setNumberField(target.value)
                          }
                        />
                        <TextField.Root
                          className="big-text-field text-field"
                          size="3"
                          placeholder="Complemento"
                          value={complementField}
                          onChange={({ target }) =>
                            setComplementField(target.value)
                          }
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
                            placeholder="Bairro"
                            value={neighborhoodField}
                            onChange={({ target }) =>
                              setNeighborhoodField(target.value)
                            }
                          />
                        </Box>
                        <Box width="276px">
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="Cidade"
                            value={cityField}
                            onChange={({ target }) =>
                              setCityField(target.value)
                            }
                          />
                        </Box>
                        <Box width="60px">
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="UF"
                            value={stateField}
                            onChange={({ target }) =>
                              setStateField(target.value)
                            }
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
              {shoppingCartData && shoppingCartData.length > 0 ? (
                <>
                  {' '}
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
                      <Text className="color-info">{`R$ ${currencyFormat(total)}`}</Text>
                    </Flex>
                    <Flex justify="between">
                      <Text className="color-info">Entrega</Text>
                      <Text className="color-info">
                        R${' '}
                        {`R$ ${currencyFormat((total * porcentValue) / 100)}`}
                      </Text>
                    </Flex>
                    <Flex justify="between">
                      <Text size="5" weight="bold" className="color-total">
                        Total
                      </Text>
                      <Text size="5" weight="bold" className="color-total">
                        R${' '}
                        {`R$ ${currencyFormat(total + (total * porcentValue) / 100)}`}
                      </Text>
                    </Flex>
                    <Button
                      size="3"
                      variant="soft"
                      className="btn-confirm"
                      onClick={() => navigate('/end-page')}
                    >
                      confirmar pedido
                    </Button>
                  </Flex>
                </>
              ) : (
                <EmptyShopping />
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
