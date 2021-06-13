import { useState, useEffect, useContext } from 'react'
import medioContext from '../../context/medios/medioContext'
import { Row, Button, Icon } from 'react-materialize'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Preloader from '../../components/layout/Preloader'

const FormMedio = ({ dataMedio, setShowForm }) => {
    const MedioContext = useContext(medioContext)
    const { addMedio, updateMedio } = MedioContext
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        M.updateTextFields();
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
    }, [])

    const formik = useFormik({
        initialValues: {
            name: dataMedio ? dataMedio.name : '',
            description: dataMedio ? dataMedio.description : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nombre obligatorio'),
            description: Yup.string().required('Descripción obligatorio')
        }),
        onSubmit: async data => {
            setIsLoading(true)

            if (dataMedio) await updateMedio(data, dataMedio)
            else await addMedio(data)

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
                        className={`btn waves-effect waves-light ${dataMedio ? 'blue' : 'green'}`}
                        icon={<Icon right>send</Icon>}
                    ><b>{dataMedio ? 'Editar' : 'Crear'}</b></Button>
                </Row>
            </form>
        </div>
    )
}

export default FormMedio