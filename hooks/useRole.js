import { useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const useRole = () => {
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const getRoles = async () => {
            const response = await clienteAxios.get('roles')
            setRoles(response.data.roles)
        }

        getRoles()
    }, [])

    return {
        roles
    }
}

export default useRole
