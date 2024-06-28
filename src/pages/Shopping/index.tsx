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
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { shoppingService } from '../../services/shopping'
import { ShoppingDataProps } from '../../types/shoppingService'
import axios from 'axios'

type FormDataPros = {
  cepField: string
  logradouroField: string
  numberField: string
  complementField?: string
  neighborhoodField: string
  cityField: string
  stateField: string
}

export function Shopping() {
  const [paymentTypeSelect, setPaymentTypeSelect] = useState<
    'CREDIT' | 'DEBIT' | 'MONEY' | undefined
  >()

  const [total, setTotal] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [, setCepField] = useState<string>('')
  const [typeError, setTypeErros] = useState<string>('')

  const { shoppingCartData, getProcentValue, porcentValue } = useShoppingCart()

  const prices = shoppingCartData.map((s) => s.count * s.price)
  const navigate = useNavigate()

  const erroMessage = 'Campo obrigatório'

  const fieldsToClear: Array<
    | 'cepField'
    | 'logradouroField'
    | 'neighborhoodField'
    | 'cityField'
    | 'stateField'
  > = [
    'cepField',
    'logradouroField',
    'neighborhoodField',
    'cityField',
    'stateField',
  ]

  const formSchema = yup.object().shape({
    cepField: yup
      .string()
      .min(8, 'cep inválido')
      .max(8, 'cep inválido')
      .required(erroMessage),
    logradouroField: yup.string().required(erroMessage),
    numberField: yup.string().required(erroMessage),
    complementField: yup.string(),
    neighborhoodField: yup.string().required(erroMessage),
    cityField: yup.string().required(erroMessage),
    stateField: yup.string().required(erroMessage),
  })

  const { register, handleSubmit, formState, setValue, clearErrors } = useForm({
    resolver: yupResolver(formSchema),
  })

  const { errors } = formState

  const handleShopping: SubmitHandler<FormDataPros> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const dataShopping: ShoppingDataProps = {
      id: '1',
      adress: data,
      shoppingCartData,
      paymentType: paymentTypeSelect || '',
    }

    try {
      const data = await shoppingService.getBuyById(dataShopping.id)
      if (data.id) {
        try {
          await shoppingService.updatedBuy(dataShopping)
          navigate('/end-page')
        } catch {
          setTypeErros('Erro realizar a compra')
          setOpen(true)
          setTimeout(() => {
            setOpen(false)
          }, 1500)
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          try {
            await shoppingService.createBuy(dataShopping)
            navigate('/end-page')
          } catch {
            setTypeErros('Erro realizar a compra')
            setOpen(true)
            setTimeout(() => {
              setOpen(false)
            }, 1500)
          }
        }
      } else {
        setTypeErros('Erro inesperado')
      }
    }
  }

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

  const clearErrorsFields = () => {
    fieldsToClear.forEach((valeu) => {
      clearErrors(valeu)
    })
  }

  const handleSearchCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        setLoading(true)
        const cepData = await cepService.getCep(cep)
        setValue('logradouroField', cepData.logradouro)
        setValue('neighborhoodField', cepData.bairro)
        setValue('cityField', cepData.localidade)
        setValue('stateField', cepData.uf)

        clearErrorsFields()
      } catch {
        setTypeErros('Erro ao encontrar cep')
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
          title={typeError}
          type="error"
        />
      )}
      <Box className="mw-1120 content-shopping" mb="5" mt="9">
        <form onSubmit={handleSubmit(handleShopping)}>
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
                        <Box>
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="CEP"
                            {...register('cepField')}
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
                          {errors.cepField && (
                            <Text className="error-message">
                              {errors.cepField.message}
                            </Text>
                          )}
                        </Box>
                        <Box>
                          <TextField.Root
                            className="text-field"
                            size="3"
                            placeholder="Rua"
                            {...register('logradouroField')}
                          />
                          {errors.logradouroField && (
                            <Text className="error-message">
                              {errors.logradouroField.message}
                            </Text>
                          )}
                        </Box>

                        <Flex gap="2">
                          <Box>
                            <TextField.Root
                              className="smalltext-field text-field w-100"
                              size="3"
                              placeholder="Número"
                              {...register('numberField')}
                            />
                            {errors.numberField && (
                              <Text className="error-message">
                                {errors.numberField.message}
                              </Text>
                            )}
                          </Box>

                          <TextField.Root
                            className="big-text-field text-field"
                            size="3"
                            placeholder="Complemento"
                            {...register('complementField')}
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
                              {...register('neighborhoodField')}
                            />
                            {errors.neighborhoodField && (
                              <Text className="error-message">
                                {errors.neighborhoodField.message}
                              </Text>
                            )}
                          </Box>
                          <Box width="276px">
                            <TextField.Root
                              className="text-field"
                              size="3"
                              placeholder="Cidade"
                              {...register('cityField')}
                            />
                            {errors.cityField && (
                              <Text className="error-message">
                                {errors.cityField.message}
                              </Text>
                            )}
                          </Box>
                          <Box width="60px">
                            <TextField.Root
                              className="text-field"
                              size="3"
                              placeholder="UF"
                              {...register('stateField')}
                            />
                            {errors.stateField && (
                              <Text className="error-message">
                                {errors.stateField.message}
                              </Text>
                            )}
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
                        O pagamento é feito na entrega. Escolha a forma que
                        deseja pagar
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
                      <Text className="payment-type-text">
                        Cartão de crédito
                      </Text>
                    </Flex>
                  </Box>
                  <Box
                    className={`btn-payment-type ${paymentTypeSelect === 'DEBIT' && 'selected'}`}
                    onClick={() => setPaymentTypeSelect('DEBIT')}
                  >
                    <Flex gap="2" align="center">
                      <Bank className="color-icons" size={20} />
                      <Text className="payment-type-text">
                        cartão de débito
                      </Text>
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
                        <Flex
                          key={product.id}
                          direction="column"
                          gap="4"
                          pr="3"
                        >
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
                        type="submit"
                        disabled={formState.isSubmitting || !paymentTypeSelect}
                      >
                        {formState.isSubmitting ? (
                          <Spinner />
                        ) : (
                          'confirmar pedido'
                        )}
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <EmptyShopping />
                )}
              </Flex>
            </Box>
          </Flex>
        </form>
      </Box>
    </>
  )
}
