import { useEffect, useContext } from 'react'
import medioContext from '../context/medios/medioContext'

const useMedios = () => {
    const MedioContext = useContext(medioContext)
    const { medios, getMedios } = MedioContext
    
    useEffect(() => {
        getMedios()
    }, [])

    return {    
        medios
    }
}

export default useMedios