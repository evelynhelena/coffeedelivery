import { ReactNode, createContext, useContext, useState } from 'react'
import { productService } from '../services/product'
import { ProductResponseProps } from '../types/productService'

interface ShoppingCartProps {
  children: ReactNode
}
interface ShoppingCartDataProps extends ProductResponseProps {
  count: number
}

interface ShoppingCartData {
  status: string
  open: boolean
  shoppingCartData: ShoppingCartDataProps[]
  porcentValue: number
  getProduct: (id: number, count: number) => void
  handleChangeStatus: () => void
  removeProductList: (id: number) => void
  editCount: (id: number, count: number) => void
  getProcentValue: () => void
  setShoppingCartData: (value: ShoppingCartDataProps[]) => void
}

export const ShoppingCartContext = createContext<ShoppingCartData>(
  {} as ShoppingCartData,
)

export function ShoppingCartProvider({ children }: ShoppingCartProps) {
  const [status, setStatus] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [porcentValue, setPorcentValue] = useState<number>(0)
  const [shoppingCartData, setShoppingCartData] = useState<
    ShoppingCartDataProps[]
  >([])

  const handleChangeStatus = () => {
    setOpen(false)
  }

  const getProduct = async (id: number, count: number) => {
    try {
      const data = await productService.getPrductById(id)
      if (
        shoppingCartData.length > 0 &&
        shoppingCartData.find((el) => el.id === data.id)
      ) {
        setShoppingCartData(
          shoppingCartData.map((s) => (s.id === data.id ? { ...s, count } : s)),
        )
      } else {
        setShoppingCartData((old) => [
          ...old,
          {
            ...data,
            count,
          },
        ])
      }
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500)

      setStatus('SUCESS')
    } catch {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500)
      setStatus('ERROR')
    }
  }

  const getProcentValue = async () => {
    try {
      const data = await productService.getPorcentValue()
      if (data) setPorcentValue(data.porcentValue)
    } catch {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500)
      setStatus('ERROR')
    }
  }

  const removeProductList = (id: number) => {
    setShoppingCartData(shoppingCartData.filter((el) => el.id !== id))
  }

  const editCount = (id: number, count: number) => {
    setShoppingCartData(
      shoppingCartData.map((s) => (s.id === id ? { ...s, count } : s)),
    )
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getProduct,
        status,
        open,
        handleChangeStatus,
        shoppingCartData,
        removeProductList,
        editCount,
        getProcentValue,
        porcentValue,
        setShoppingCartData,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  return context
}
