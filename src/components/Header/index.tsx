import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { MapPin, ShoppingCart } from 'phosphor-react'
import Logo from '../../assets/Logo.svg'
import './index.scss'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { shoppingCartData } = useShoppingCart()
  const navigate = useNavigate()
  let countProduct = 0
  const countProductFunction = () => {
    shoppingCartData.forEach((el) => {
      countProduct += el.count
    })
    return countProduct
  }
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
            <Button className="btn-cart" onClick={() => navigate('/shopping')}>
              <ShoppingCart size={22} weight="fill" />
              {shoppingCartData.length > 0 && (
                <Box className="circle-counter">
                  <Text size="1">{countProductFunction()}</Text>
                </Box>
              )}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
