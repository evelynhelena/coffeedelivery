import { CepProps } from '../types/cep'

export const cepService = {
  getCep: async function (cep: string): Promise<CepProps> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    const data: CepProps = await response.json()
    return data
  },
}
