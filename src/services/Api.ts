import Axios from 'axios'

const { hostname } = window.location

console.log(hostname)

const url =
  hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://servercoffeedelivery.vercel.app/'

console.log(url)

const api = Axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
