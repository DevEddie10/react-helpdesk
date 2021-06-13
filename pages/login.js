import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import authContext from '../context/authentication/authContext'
import Preloader from '../components/layout/Preloader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
    const AuthContext = useContext(authContext)
    const { login, authenticated } = AuthContext
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (authenticated) {
            router.push('/')
        }
    }, [authenticated])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Correo no valido')
                .required('El correo es obligatorio'),
            password: Yup.string()
                .required('La contraseña es obligatorio')
        }),
        onSubmit: async data => {
            setLoading(true)
            await login(data)
            setLoading(false)
        }
    })

    return (
        <Layout>
            <h2 className="center"><b>Helpdesk</b></h2>
            {loading ? (
                <Preloader />
            ) : null}

            <form
                onSubmit={formik.handleSubmit}
            >
                <div className="input-field col s12">
                    <i className="material-icons prefix">mail</i>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="email">Correo electronico</label>
                    <span className="red-text text-darken-2"><b>{formik.errors.email}</b></span>
                </div>

                <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="off"
                    />
                    <label htmlFor="password">Contraseña</label>
                    <span className="red-text text-darken-2"><b>{formik.errors.password}</b></span>
                </div>

                <div className="input-field col s12">
                    <button
                        type="submit"
                        className="btn btn-small btn-block waves-effect waves-light blue darken-2"
                    ><b>Iniciar sesion</b></button>
                </div>
            </form>
        </Layout >
    )
}

export default Login