import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import ticketContext from '../../../context/tickets/ticketContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePriority from '../../../hooks/usePriority'
import useModule from '../../../hooks/useModule'
import useSolution from '../../../hooks/useSolution'

const FormConcludeTicket = ({ dataTicket }) => {
    const TicketContext = useContext(ticketContext)
    const { addCloseTicket } = TicketContext
    const [btnDisabled, setBtnDisabled] = useState(null)

    const router = useRouter()
    const { priorities } = usePriority(2)
    const { modules } = useModule()
    const { solutions } = useSolution()

    const formik = useFormik({
        initialValues: {
            description: '',
            modulo_id: '',
            solution_id: '',
            status_id: ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required('El campo es obligatorio'),
            modulo_id: Yup.string().required('El campo es obligatorio'),
            solution_id: Yup.string().required('El campo es obligatorio'),
            status_id: Yup.string().required('El campo es obligatorio')
        }),
        onSubmit: async data => {
            setBtnDisabled('disabled')
            await addCloseTicket(data, dataTicket)
            router.push('/asignaciones')
            setBtnDisabled(null)
        }
    })
    
    return (
        <div className="container">
            <div className="row">
                {dataTicket.status === 3 ? (
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="input-field col s12">
                            <i className="material-icons prefix">description</i>
                            <input
                                type="text"
                                name="description"
                                id="desc"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="desc">Descripcion</label>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.description}</b>
                            </span>
                        </div>

                        <div className="col s12 xl4 mb-3">
                            <label>Modulo</label>
                            <select
                                className="browser-default select-css"
                                name="modulo_id"
                                value={formik.values.modulo_id}
                                onChange={formik.handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                {modules.map(module => (
                                    <option
                                        key={module.id}
                                        value={module.id}
                                    >{module.name}</option>
                                ))}
                            </select>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.modulo_id}</b>
                            </span>
                        </div>

                        <div className="col s12 xl4 mb-3">
                            <label>Solución</label>
                            <select
                                className="browser-default select-css"
                                name="solution_id"
                                value={formik.values.solution_id}
                                onChange={formik.handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                {solutions.map(solution => (
                                    <option
                                        key={solution.id}
                                        value={solution.id}
                                    >{solution.name}</option>
                                ))}
                            </select>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.solution_id}</b>
                            </span>
                        </div>

                        <div className="col s12 xl4 mb-3">
                            <label>Estado</label>
                            <select
                                className="browser-default select-css"
                                name="status_id"
                                value={formik.values.status_id}
                                onChange={formik.handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                {priorities.map(priority => (
                                    <option
                                        key={priority.id}
                                        value={priority.id}
                                    >{priority.name}</option>
                                ))}
                            </select>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.status_id}</b>
                            </span>
                        </div>

                        <div className="input-field col s12">
                            <button
                                type="submit"
                                className={`btn waves-effect waves-light blue darken-1 ${btnDisabled}`}
                            ><b>Cerrar</b></button>
                        </div>
                    </form>
                ) : (
                    <span className="card-title red-text text-darken-2">
                        Necesitas tener al menos un seguimiento para poder cerrar el ticket.
                    </span>
                )}
            </div>
        </div>
    )
}

export default FormConcludeTicket