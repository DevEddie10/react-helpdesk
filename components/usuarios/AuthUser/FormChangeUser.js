import { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import authContext from '../../../context/authentication/authContext'
import Preloader from '../../layout/Preloader'
import * as Yup from 'yup'

const FormChangeUser = () => {
    const AuthContext = useContext(authContext)
    const { user, authUserUpdate } = AuthContext
    const [IsLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: user ? user.user.name : '',
            email: user ? user.user.email : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nombre obligatorio'),
            email: Yup.string()
                .email('Correo no valido')
                .required('El correo es obligatorio')
        }),
        onSubmit: async data => {
            setIsLoading(true)
            await authUserUpdate(user, data)
            setIsLoading(false)
        }
    })

    useEffect(() => {
        M.updateTextFields();
    }, [])

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <div className="row">
                <div className="input-field col s12 l4">
                    <i className="material-icons prefix">person_pin</i>
                    <input
                        type="text"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="name">Nombre</label>
                    <span className="red-text text-darken-2">
                        <b>{formik.errors.name}</b>
                    </span>
                </div>

                <div className="input-field col s12 l4">
                    <i className="material-icons prefix">mail</i>
                    <input
                        type="text"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="email">E-mail</label>
                    <span className="red-text text-darken-2">
                        <b>{formik.errors.email}</b>
                    </span>
                </div>

                <div className="input-field col s12 l2">
                    <button type="submit" className="btn-small waves-effect waves-light red">
                        <b>Editar</b>
                    </button>
                </div>

                <div className="input-field col s12 l2">
                    {IsLoading ? (
                        <Preloader />
                    ) : null }
                </div>
            </div>
        </form>
    )
}

export default FormChangeUser