import { useEffect, useContext } from 'react'
import moduloContext from '../context/modulos/moduloContext'

const useModule = () => {
    const ModuloContext = useContext(moduloContext)
    const { modules, getModules } = ModuloContext
    
    useEffect(() => {
        getModules()
    }, [])

    return {
        modules
    }
}

export default useModule