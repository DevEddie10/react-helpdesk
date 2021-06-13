import { useEffect, useContext } from 'react'
import solucionContext from '../context/soluciones/solucionContext'

const useSolution = () => {
    const SolucionContext = useContext(solucionContext)
    const { solutions, getSolutions } = SolucionContext
    
    useEffect(() => {
        getSolutions()
    }, [])

    return {
        solutions
    }
}

export default useSolution