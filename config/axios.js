import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: process.env.backendLaravel
})

export default clienteAxios