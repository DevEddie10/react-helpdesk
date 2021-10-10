import { useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const useCountTicket = () => {
    const [Count, setCount] = useState(null)

    useEffect(() => {
        const getCountTicket = async () => {
            const response = await clienteAxios.get(`/conteo`)
            setCount(response.data)
        }

        getCountTicket()
    }, [])

    return {
        Count
    }
}

export default useCountTicket