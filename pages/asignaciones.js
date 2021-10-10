import { useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import ticketContext from '../context/tickets/ticketContext'
import { Collection } from 'react-materialize'
import Asignacion from '../components/tickets/specialists/Asignacion'

const Asignaciones = () => {
    const TicketContext = useContext(ticketContext)
    const { assignments, assignmentsTickets } = TicketContext

    useEffect(() => {
        const getTicketSpecialist = async () => {
            await assignmentsTickets()
        }

        getTicketSpecialist()
    }, [])

    return (
        <Layout>
            {assignments.length > 0 ? (
                <>
                    <h1 className="title-header">Bandeja de tickets asignados</h1>

                    <Collection className="li-striped">
                        {assignments.map(assign => (
                            <Asignacion
                                key={assign.id}
                                assign={assign}
                            />
                        ))}
                    </Collection>
                </>
            ) : (
                <h1 className="title-header red-text text-darken-2">No tienes tickets asignados</h1>
            )}
        </Layout>
    )
}

export default Asignaciones