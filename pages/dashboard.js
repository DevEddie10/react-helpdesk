import { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import ticketContext from '../context/tickets/ticketContext'
import { Table } from 'react-materialize'
import Ticket from '../components/dashboard/Ticket'
import Menu from '../components/dashboard/Menu'
import FormAssign from '../components/dashboard/FormAssign'

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

                            <Table responsive={true}>
                                <thead className="grey lighten-3">
                                    <tr>
                                        <th>Ticket</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                        <th>Medio</th>
                                        <th>Estado</th>
                                        <th>Asignar</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {alltickets.map(ticket => (
                                        <Ticket
                                            key={ticket.id}
                                            ticket={ticket}
                                            setShowForm={setShowForm}
                                            setDataAssign={setDataAssign}
                                        />
                                    ))}
                                </tbody>
                            </Table>
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