import { Button, Icon } from 'react-materialize'

const Ticket = ({ ticket, setShowForm, setDataAssign }) => {
    const asignarUser = id => {
        setShowForm(true)
        setDataAssign(id)
    }

    return (
        <tr>
            <td>{ticket.id}</td>
            <td>{ticket.user.name}</td>
            <td>{ticket.description}</td>
            <td>{ticket.category.name}</td>
            <td>{ticket.medio.name}</td>
            <td>{ticket.state.name}</td>
            <td>
                <Button
                    floating
                    className="red"
                    onClick={() => asignarUser(ticket.id)}
                >
                    <Icon>person_add</Icon>
                </Button>
            </td>
        </tr>
    )
}

export default Ticket