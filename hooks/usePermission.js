import { useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const usePermission = () => {
    const [permission, setPermission] = useState([])

    useEffect(() => {
        const getPermissions = async () => {
            const response = await clienteAxios.get('permisos')
            setPermission(response.data.permission)
        }

        getPermissions()
    }, [])

    return {
        permission
    }
}

export default usePermission