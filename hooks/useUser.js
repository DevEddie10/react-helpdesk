import { useState, useEffect, useContext } from 'react'
import clienteAxios from '../config/axios'
import authContext from '../context/authentication/authContext'

const useUser = () => {
    const [users, setUsers] = useState([])
    const AuthContext = useContext(authContext)
    const { reload } = AuthContext

    useEffect(() => {
        (async () => {
            const response = await clienteAxios.get('/usuarios')
            setUsers(response.data.users);
        })()
    }, [reload])
    
    return {
        users
    }
}

export default useUser