import { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import ticketContext from '../context/tickets/ticketContext'
import { Row, Col, Button, Collection, Icon } from 'react-materialize'
import TicketUsuario from '../components/tickets/TicketUsuario'
import FormRegisterTicket from '../components/tickets/FormRegisterTicket'

const Registro = () => {
    const TicketContext = useContext(ticketContext)
    const { tickets, dataReloader, getUserTickets } = TicketContext
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Tickets registrados')

    useEffect(() => {
        if (!dataReloader) {
            getUserTickets()
        }
    }, [dataReloader])

    const openForm = () => {
        if (showForm) {
            setShowForm(false)
            setTitle('Tickets registrados')
        } else {
            setShowForm(true)
            setTitle('Nuevo ticket')
        }
    }

    return (
        <Layout>
            {tickets.length > 0 ? (
                <Row>
                    <h1 className="title-header">{title}</h1>

                    <Col
                        l={12}
                        m={12}
                        s={12}
                    >
                        <Button
                            className={showForm ? 'red mb-2' : 'green mb-2'}
                            node="button"
                            waves="light"
                            floating
                            large
                            icon={showForm ? <Icon>arrow_back</Icon> : <Icon>add_circle_outline</Icon>}
                            onClick={() => openForm()}
                        ></Button>

                        {showForm ? (
                            <FormRegisterTicket
                                setShowForm={setShowForm}
                            />
                        ) : (
                            <Collection className="li-striped">
                                {tickets.map(user => (
                                    <TicketUsuario
                                        key={user.id}
                                        user={user}
                                    />
                                ))}
                            </Collection>
                        )}
                    </Col>
                </Row>
            ) : (
                <>
                    <h1 className="red-text text-darken-3 title-header">
                        <b>No has registrado tickets</b>
                    </h1>

                    <FormRegisterTicket
                        setShowForm={setShowForm}
                    />
                </>
            )}
        </Layout>
    )
}

export default Registro