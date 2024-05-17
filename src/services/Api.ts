import Axios from 'axios'

const teste = window.location.hostname

console.log(teste)

const api = Axios.create({
  baseURL: 'https://servercoffeedelivery.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
