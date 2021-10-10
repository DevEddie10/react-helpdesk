import Layout from '../components/layout/Layout'
import FormChangeUser from '../components/usuarios/AuthUser/FormChangeUser'
import FormChangePassword from '../components/usuarios/AuthUser/FormChangePassword'
import FormChangeImage from '../components/usuarios/AuthUser/FormChangeImage'

const Editarusuario = () => {
    return (
        <Layout>
            <h1 className="title-header">Editar usuario</h1>

            <div className="container">
                <FormChangeUser />
                
                <FormChangePassword />

                <FormChangeImage />
            </div>
        </Layout>
    )
}

export default Editarusuario