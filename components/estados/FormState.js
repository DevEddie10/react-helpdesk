import { useState, useEffect, useContext } from 'react'
import stateContext from '../../context/states/stateContext'
import { Row, Button, Icon } from 'react-materialize'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Preloader from '../../components/layout/Preloader'

const FormState = ({ setShowForm, dataState }) => {
    const StateContext = useContext(stateContext)
    const { addState, updateState } = StateContext
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        M.updateTextFields();
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
    }, [])

    const formik = useFormik({
        initialValues: {
            name: dataState ? dataState.name : '',
            description: dataState ? dataState.description : '',
            status: dataState ? dataState.status : '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nombre obligatorio'),
            description: Yup.string().required('Descripción obligatorio'),
            status: Yup.number().required('Seleccione un estado')
        }),
        onSubmit: async data => {
            setIsLoading(true)

            if (dataState) await updateState(data, dataState)
            else await addState(data)

            setIsLoading(false)
            setShowForm(false)
        }
    })

    return (
        <div className="container">
            {IsLoading ? (
                <Preloader />
            ) : null}

            <form
                onSubmit={formik.handleSubmit}
            >
                <Row>
                    <div className="input-field col s12 m6 l6 xl6">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="name">Nombre</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.name}</b>
                        </span>
                    </div>

                    <div className="input-field col s12 m6 l6 xl6">
                        <select
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            name="status"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="1">Prioridad ticket</option>
                            <option value="2">Estado ticket</option>
                        </select>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.status}</b>
                        </span>
                    </div>
                </Row>

                <Row>
                    <div className="input-field col s12 m6 l6 xl12">
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="description">Descripción</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.description}</b>
                        </span>
                    </div>
                </Row>

                <Row>
                    <Button
                        node="button"
                        type="submit"
                        className={`btn waves-effect waves-light ${dataState ? 'blue' : 'green'}`}
                        icon={<Icon right>send</Icon>}
                    ><b>{dataState ? 'Editar' : 'Crear'}</b></Button>
                </Row>
            </form>
        </div>
    )
}

export default FormState