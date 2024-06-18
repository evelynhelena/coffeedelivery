import { Flex, Text } from '@radix-ui/themes'
import { ShoppingBagOpen } from 'phosphor-react'
import './index.scss'

export function EmptyShopping() {
  return (
    <Flex
      direction="column"
      align="center"
      gap="4"
      className="empty-shopping-content"
    >
      <ShoppingBagOpen size={64} className="icon" />
      <Text size="4">Nenhum produto selecionado!</Text>
    </Flex>
  )
}
