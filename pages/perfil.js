import { useContext } from 'react'
import Layout from '../components/layout/Layout'
import authContext from '../context/authentication/authContext'

const Perfil = () => {
    const AuthContext = useContext(authContext)
    const { user } = AuthContext

    return (
        <Layout>
            <h1 className="title-header">Perfil</h1>

            <div className="row">
                <div className="col s3">
                    {user ? (
                        user.user.image ? (
                            <img
                                className="responsive-img circle"
                                src={`${process.env.urlImage}${user.user.image}`}
                            />
                        ) : (
                            <img
                                className="responsive-img circle"
                                src='/img/user.png'
                            />
                        )
                    ) : null}
                </div>

                <div className="col s9">
                    <h5><b>No. Control: </b>{user ? user.user.id : null}</h5>
                    <h5><b>Nombre: </b>{user ? user.user.name : null}</h5>
                    <h5><b>E-mail: </b>{user ? user.user.email : null}</h5>
                    {user ? (
                        user.user.roles.map(role => (
                            <h5 key={role}><b>Permiso: </b>{role.display_name}</h5>
                        ))
                    ) : null}
                </div>
            </div>
        </Layout>
    )
}

export default Perfil