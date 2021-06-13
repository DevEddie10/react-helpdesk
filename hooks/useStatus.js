import { useEffect, useContext } from 'react'
import stateContext from '../context/states/stateContext'

const useStatus = () => {
    const StateContext = useContext(stateContext)
    const { status, getStates } = StateContext
    
    useEffect(() => {
        getStates()
    }, [])

    return {
        status
    }
}

export default useStatus