import { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import ticketContext from '../context/tickets/ticketContext'
import Ticket from '../components/tickets/admin/Ticket'
import Menu from '../components/tickets/admin/Menu'
import FormAssign from '../components/tickets/admin/FormAssign'

const Dashboard = () => {
    const TicketContext = useContext(ticketContext)
    const { alltickets, getAllTickets } = TicketContext
    const [showForm, setShowForm] = useState(false)
    const [dataAssign, setDataAssign] = useState(null)

    useEffect(() => {
        getAllTickets()
    }, [])

    return (
        <Layout>
            <Menu />
            {showForm ? (
                <FormAssign
                    setShowForm={setShowForm}
                    dataAssign={dataAssign}
                />
            ) : (
                <>
                    {alltickets.length > 0 ? (
                        <>
                            <h1 className="title-header">Administración de tickets</h1>
                            {alltickets && (
                                <span className="card-title">
                                    <p>Total Asignados: {alltickets.length}</p></span>
                            )}

                            <ul className="collection li-striped">
                                {alltickets.map(ticket => (
                                    <Ticket
                                        key={ticket.id}
                                        ticket={ticket}
                                        setShowForm={setShowForm}
                                        setDataAssign={setDataAssign}
                                    />
                                ))}
                            </ul>
                        </>
                    ) : (
                        <h1 className="title-header red-text text-darken-2">
                            NO HAY TICKETS
                        </h1>
                    )}
                </>
            )}
        </Layout>
    )
}

export default Dashboard