import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { MapPin, ShoppingCart } from 'phosphor-react'
import Logo from '../../assets/Logo.png'
import './index.scss'

export function Header() {
  return (
    <Box pt="6" className="header-content mw-1120">
      <Flex justify="between">
        <Box>
          <img src={Logo} alt="Logo" />
        </Box>
        <Box>
          <Flex gap="2">
            <Box className="box-adress">
              <Flex align="center" gap="1">
                <MapPin size={20} weight="fill" />
                <Text size="2">Porto Alegre, RS</Text>
              </Flex>
            </Box>
            <Button className="btn-cart">
              <ShoppingCart size={22} weight="fill" />
              <Box className="circle-counter">
                <Text size="1">3</Text>
              </Box>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
