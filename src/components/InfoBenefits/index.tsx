import { Box, Flex, Text } from '@radix-ui/themes'
import { ReactNode } from 'react'
import './index.scss'

interface InfoBenefitsProps {
  label: string
  icon: ReactNode
  color: string
}

export function InfoBenefits({ label, icon, color }: InfoBenefitsProps) {
  return (
    <Flex className="info-benefits-component">
      <Box className={`box-icon ${color}`}>{icon}</Box>
      <Text size="2">{label}</Text>
    </Flex>
  )
}
