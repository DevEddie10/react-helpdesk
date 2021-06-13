import { useContext } from 'react'
import { useRouter } from 'next/router'
import ticketContext from '../../../context/tickets/ticketContext'
import useRole from '../../../hooks/useRole'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormReasign = ({ dataTicket }) => {
    const TicketContext = useContext(ticketContext)
    const { reasignTicket } = TicketContext
    const router = useRouter()
    const { roles } = useRole()
    const formik = useFormik({
        initialValues: {
            description: '',
            assigned_id: ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required('El campo es obligatorio'),
            assigned_id: Yup.string().required('El campo es obligatorio')
        }),
        onSubmit: async data => {
            await reasignTicket(data, dataTicket)
            router.push('/asignaciones')
        }
    })

    return (
        <div className="container">
            {dataTicket.status === 3 ? (
                <div className="row">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="input-field col s12 mb-2">
                            <i className="material-icons prefix">description</i>
                            <input 
                                type="text" 
                                name="description" 
                                id="desc-reasg"
                                value={formik.values.description}
                                onChange={formik.handleChange} 
                            />
                            <label htmlFor="desc-reasg">Descripción</label>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.description}</b>
                            </span>
                        </div>

                        <div className="col s12">
                            <label>Especialista</label>
                            <select 
                                className="browser-default select-css mb-2"
                                name="assigned_id"
                                value={formik.values.assigned_id}
                                onChange={formik.handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                {roles.map(role => (
                                    role.user.map(specialist => (
                                        <option 
                                            key={specialist.id} 
                                            value={specialist.id}
                                        >{specialist.name}</option>
                                    ))
                                ))}
                            </select>
                            <span className="red-text text-darken-2">
                                <b>{formik.errors.assigned_id}</b>
                            </span>
                        </div>

                        <div className="input-field col s12">
                            <button
                                type="submit"
                                className="btn waves-effect waves-light red darken-2"
                            ><b>Reasignar</b></button>
                        </div>
                    </form>
                </div>
            ) : (
                <span className="card-title red-text text-darken-2">
                    Necesitas tener al menos un seguimiento para poder reasignar el ticket
                </span>
            )}
        </div>
    )
}

export default FormReasign