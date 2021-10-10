import { Button, Icon } from 'react-materialize'
import Moment from 'react-moment'
import 'moment/locale/es'

const Ticket = ({ ticket, setShowForm, setDataAssign }) => {
    const asignarUser = id => {
        setShowForm(true)
        setDataAssign(id)
    }

    return (
        <li className="collection-item avatar">
            <img src="img/user.png" alt="usuario" className="circle" />

            {ticket.user && ticket.user.image ? (
                <img
                    alt="nombre"
                    className="circle"
                    src={`${process.env.urlImage}${ticket.user.image}`}
                />
            ) : (
                <img src="img/user.png" alt="usuario" className="circle" />
            )}

            <span className="chip">Usuario: <b>{ticket.user.name}</b></span>

            <div className="mb-1">
                <p><b>Descripcion:</b> {ticket.description}</p>
            </div>

            <div className="row">
                <div className="col s12 l6">
                    <p><b>Ticket #:</b> {ticket.id}</p>
                    <p><b>Fecha:</b> <Moment fromNow>{ticket.created_at}</Moment></p>
                    <p><span className="new badge left red darken-1" data-badge-caption=""><b>Nuevo</b></span></p>
                </div>

                <div className="col s12 l6">
                    <p><b>Medio:</b> {ticket.medio.name}</p>
                    <p><b>Prioridad:</b> {ticket.state.name}</p>
                    <p><b>Categoría:</b> {ticket.category.name}</p>
                </div>
            </div>

            <Button
                floating
                className="green secondary-content"
                onClick={() => asignarUser(ticket.id)}
            >
                <Icon>person_add</Icon>
            </Button>
        </li>
    )
}

export default Ticket