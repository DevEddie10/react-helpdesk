import { useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const usePriority = (id) => {
    const [priorities, setPriorities] = useState([])

    useEffect(() => {
        const getPriority = async () => {
            const response = await clienteAxios.get(`/prioridad/${id}`)
            setPriorities(response.data.priorities)
        }

        getPriority()
    }, [])

    return {
        priorities
    }
}

export default usePriority