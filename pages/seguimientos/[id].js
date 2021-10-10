import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import ticketContext from '../../context/tickets/ticketContext'
import Tracking from '../../components/tickets/specialists/Tracking'
import Error404 from '../../components/layout/Error404'

const Seguimiento = () => {
    const router = useRouter();
    const { query: { id } } = router

    const [dataTicket, setDataTicket] = useState([])
    const TicketContext = useContext(ticketContext)
    const { dataReloader, trackingTicket } = TicketContext

    useEffect(() => {
        if (id) {
            const getTicket = async () => {
                const response = await trackingTicket(id)
                setDataTicket(response)
            }
            getTicket()
        }
    }, [id, dataReloader])

    return (
        <Layout>
            {!dataTicket ? (
                <Error404 text="No tienes permiso para ejecutar esta accion" />
            ) : (
                <Tracking 
                    dataTicket={dataTicket} 
                />
            )}
        </Layout>
    )
}

export default Seguimiento