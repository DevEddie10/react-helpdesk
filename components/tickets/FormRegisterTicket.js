import { useState, useEffect, useContext } from 'react'
import useCategory from '../../hooks/useCategory'
import useMedios from '../../hooks/useMedios'
import usePriority from '../../hooks/usePriority'
import ticketContext from '../../context/tickets/ticketContext'
import Preloader from '../../components/layout/Preloader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormRegisterTicket = ({ setShowForm }) => {
    const { categories } = useCategory()
    const { medios } = useMedios()
    const { priorities } = usePriority(1)

    const TicketContext = useContext(ticketContext)
    const { registerTicket } = TicketContext
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
    }, [])

    const formik = useFormik({
        initialValues: {
            category_id: '',
            media_id: '',
            state_id: '',
            description: '',
            status: 1
        },
        validationSchema: Yup.object({
            category_id: Yup.number().required('Selecccione una categoría'),
            media_id: Yup.number().required('Selecccione un medio'),
            state_id: Yup.number().required('Selecccione una prioridad'),
            description: Yup.string().required('Escriba una descripción')
        }),
        onSubmit: async data => {
            setIsLoading(true)
            await registerTicket(data)
            setIsLoading(false)
            setShowForm(false)
        }
    })

    return (
        <div className="container">
            {isLoading ? (
                <Preloader />
            ): null}
            <form
                onSubmit={formik.handleSubmit}
            >
                <div className="row">
                    <div className="col s12 mb-2">
                        <label className="text-label" htmlFor="category_id">Categoría</label>
                        <select
                            className="browser-default select-css mb-1"
                            name="category_id"
                            id="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                        >
                            <option className="grey lighthen-3 white-text" value="">Seleccione una opción</option>
                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >{category.name}</option>
                            ))}
                        </select>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.category_id}</b>
                        </span>
                    </div>

                    <div className="col s12 mb-2">
                        <label className="text-label" htmlFor="media_id">Medio de comunicación</label>
                        <select
                            className="browser-default select-css mb-1"
                            name="media_id"
                            id="media_id"
                            value={formik.values.media_id}
                            onChange={formik.handleChange}
                        >
                            <option className="grey lighthen-3 white-text" value="">Seleccione una opción</option>
                            {medios.map(medio => (
                                <option
                                    key={medio.id}
                                    value={medio.id}
                                >{medio.name}
                                </option>
                            ))}
                        </select>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.media_id}</b>
                        </span>
                    </div>

                    <div className="col s12 mb-3">
                        <label className="text-label" htmlFor="state_id">Prioridad</label>
                        <select
                            className="browser-default select-css mb-1"
                            name="state_id"
                            id="state_id"
                            value={formik.values.state_id}
                            onChange={formik.handleChange}
                        >
                            <option className="grey lighthen-3 white-text" value="">Seleccione una opción</option>
                            {priorities.map(priority => (
                                <option
                                    key={priority.id}
                                    value={priority.id}
                                >{priority.name}
                                </option>
                            ))}
                        </select>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.state_id}</b>
                        </span>
                    </div>

                    <div className="input-field col s12">
                        <input 
                            type="text" 
                            name="description" 
                            id="description"
                            autoComplete="off" 
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="description">Descripción</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.description}</b>
                        </span>
                    </div>

                    <div className="input-field col s12">
                        <button type="submit" className="btn waves-effect waves-light green">
                            <b>Registro</b>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRegisterTicket