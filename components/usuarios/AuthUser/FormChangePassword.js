import { useState, useContext } from 'react'
import authContext from '../../../context/authentication/authContext'
import Preloader from '../../layout/Preloader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormChangePassword = () => {
    const AuthContext = useContext(authContext)
    const { user, updateAuthPassword } = AuthContext
    const [IsLoading, setIsLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Campo obligatorio')
                .oneOf([Yup.ref('repeatPassword')], 'La contraseña no coincide con la nueva')
                .min(6, 'La contraseña al menos debe tener 6 caracteres'),
            repeatPassword: Yup.string()
                .required('Campo obligatorio')
                .oneOf([Yup.ref('password')], 'La nueva contraseña no coincide con la antigua')
                .min(6, 'La contraseña al menos debe tener 6 caracteres')
        }),
        onSubmit: async data => {
            setIsLoading(true)
            await updateAuthPassword(user, data)
            setIsLoading(false)
        }
    })

    return (
        <>
            <h1 className="title-header">Editar contraseña</h1>

            <div className="row">
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="input-field col s12 l4">
                        <i className="material-icons prefix">https</i>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="password">Nueva contraseña</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.password}</b>
                        </span>
                    </div>

                    <div className="input-field col s12 l4">
                        <i className="material-icons prefix">https</i>
                        <input
                            type="password"
                            id="repeatPassword"
                            autoComplete="off"
                            value={formik.values.repeatPassword}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="repeatPassword">Repetir contraseña</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.repeatPassword}</b>
                        </span>
                    </div>

                    <div className="input-field col s12 l2">
                        <button
                            type="submit"
                            className="btn waves-effect waves-light red"
                        ><b>Editar</b></button>
                    </div>

                    <div className="input-field col s12 l2">
                        {IsLoading ? (
                            <Preloader />
                        ) : null}
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormChangePassword