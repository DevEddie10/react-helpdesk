import { useState, useEffect, useContext } from 'react'
import categoryContext from '../../context/categories/categoryContext'
import { Row, Button, Icon } from 'react-materialize'
import Preloader from '../layout/Preloader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormCategory = ({ setShowForm, dataCategory }) => {
    const CategoryContext = useContext(categoryContext)
    const { addCategory, updateCategory } = CategoryContext
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        M.updateTextFields();
    }, [])

    const formik = useFormik({
        initialValues: {
            name: dataCategory ? dataCategory.name : '',
            description: dataCategory ? dataCategory.description : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nombre obligatorio'),
            description: Yup.string().required('Descripción obligatorio')
        }),
        onSubmit: async data => {
            setLoading(true)
            if (dataCategory) {
                await updateCategory(data, dataCategory)
            } else {
                await addCategory(data)
            }
            setShowForm(false)
            setLoading(false)
        }
    })

    return (
        <div className="container">
            {loading && (
                <Preloader />
            )}

            <form
                onSubmit={formik.handleSubmit}
            >
                <Row>
                    <div className="input-field col s12 m6 x6 xl6">
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
                    <div className="input-field col s12 m6 x6 xl12">
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
                        className={`btn waves-effect waves-light ${dataCategory ? 'blue' : 'green'}`}
                        icon={<Icon right>send</Icon>}
                    ><b>{dataCategory ? 'Editar' : 'Crear'}</b></Button>
                </Row>
            </form>
        </div>
    )
}

export default FormCategory