export const currencyFormat = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'code',
  })
    .format(value)
    .replace('BRL', '')
    .trim()

export const dateFormat = (value: Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(value)
