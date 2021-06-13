import { useState } from 'react'
import { Button, Icon } from 'react-materialize'
import Layout from '../components/layout/Layout'
import useUsers from '../hooks/useUser'
import User from '../components/usuarios/User'
import FormUser from '../components/usuarios/FormUser'

const Usuarios = () => {
    const { users } = useUsers()
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de Usuario')
    const [dataState, setDataState] = useState(null)

    const openForm = () => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de Usuario')
            setDataState(null)
        } else {
            setShowForm(true)
            setTitle('Registro de usuario')
            setDataState(null)
        }
    }

    return (
        <Layout>
            <h1 className="title-header">{title}</h1>

            <Button
                className={showForm ? 'red' : 'green'}
                fab
                floating
                node="button"
                large
                icon={showForm ? <Icon>arrow_back</Icon> : <Icon>add_circle_outline</Icon>}
                onClick={() => openForm(title)}
            />

            {showForm ? (
                <FormUser
                    setShowForm={setShowForm}
                    dataState={dataState}
                />
            ) : (
                <>
                    {users.length > 0 ? (
                        <table className="responsive-table">
                            <thead className="grey grey lighten-3">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <User
                                        key={user.id}
                                        user={user}
                                        setShowForm={setShowForm}
                                        setTitle={setTitle}
                                        setDataState={setDataState}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : <strong className="red-text text-darken-2">No hay usuarios registrados</strong>}
                </>
            )}
        </Layout>
    )
}

export default Usuarios