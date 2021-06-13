import { useContext } from 'react'
import { Button, Icon } from 'react-materialize'
import authContext from '../../context/authentication/authContext'

const User = ({ user, setShowForm, setTitle, setDataState }) => {

    const AuthContext = useContext(authContext)
    const { deleteUser } = AuthContext

    const editUser = data => {
        setTitle('Editar Usuario')
        setShowForm(true)
        setDataState(data)
    }

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editUser(user)}
                />
            </td>
            <td>
                <Button
                    className="red"
                    floating
                    icon={<Icon>remove</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => deleteUser(user.id)}
                />
            </td>
        </tr>
    )
}

export default User