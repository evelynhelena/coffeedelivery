import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { Header } from '../../components/Header'
import './index.scss'
import { MapPinLine } from 'phosphor-react'

export function Shopping() {
  return (
    <>
      <Header />
      <Box className="mw-1120 content-shopping">
        <Text className="baloo-2-extra-bold subtitle" size="4">
          Complete seu pedido
        </Text>

        <Box className="box-adress">
          <Flex direction="column" gap="3">
            <Box>
              <Flex direction="column" gap="2">
                <Text>
                  <MapPinLine size={20} />
                  Endereço de Entrega
                </Text>
                <Text>Informe o endereço onde deseja receber seu pedido</Text>
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
                  />
                </Flex>

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
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
