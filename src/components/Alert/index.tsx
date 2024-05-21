import { Callout, Flex, Progress } from '@radix-ui/themes'
import { ReactNode } from 'react'
import './index.scss'
import { X } from 'phosphor-react'
import { useShoppingCart } from '../../hooks/useShoppingCart'

interface AlertProps {
  icon: ReactNode
  title: string
  type: 'sucess' | 'error'
}

export const Alert = ({ icon, title, type }: AlertProps) => {
  const { handleChangeStatus } = useShoppingCart()
  return (
    <Callout.Root className={`alert ${type}`}>
      <Flex gap="3" p="2">
        <Callout.Icon>{icon}</Callout.Icon>
        <Callout.Text>{title}</Callout.Text>
        <Callout.Icon className="icon-close" onClick={handleChangeStatus}>
          <X size={16} />
        </Callout.Icon>
      </Flex>
      <Progress duration="1s" className="progress-bar" radius="none" />
    </Callout.Root>
  )
}
