import { useState, useContext } from 'react'
import useRoles from '../../../hooks/useRole'
import ticketContext from '../../../context/tickets/ticketContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Icon } from 'react-materialize'
import Preloader from '../../layout/Preloader'

const FormAssign = ({ setShowForm, dataAssign }) => {
    const TicketContext = useContext(ticketContext)
    const { AssignTicket } = TicketContext
    const [IsLoading, setIsLoading] = useState(false)
    const { roles } = useRoles()
    const formik = useFormik({
        initialValues: {
            assigned_id: ''
        },
        validationSchema: Yup.object({
            assigned_id: Yup.number().required('Seleccione un especialista')
        }),
        onSubmit: async data => {
            setIsLoading(true)
            await AssignTicket(data, dataAssign)
            setIsLoading(false)
            setShowForm(false)
        }
    })

    return (
        <div>
            <Button floating onClick={() => setShowForm(false)} className="red">
                <Icon>arrow_back</Icon>
            </Button>
            
            <div className="container">
                {IsLoading ? (
                    <Preloader />
                ) : null}

                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col s12 xl6">
                            <label htmlFor="assigned_id">Especialista</label>
                            <select
                                className="browser-default select-css"
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
                            <span>
                                <b className="red-text text-darken-2">{formik.errors.assigned_id}</b>
                            </span>
                        </div>

                        <div className="input-field col s12 xl12">
                            <button 
                                type="submit" 
                                className="btn waves-effect waves-light red"
                            ><i className="material-icons right">person_add</i><b>Asignar</b></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormAssign