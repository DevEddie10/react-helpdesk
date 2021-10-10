import { useContext } from 'react'
import { useRouter } from 'next/router'
import ticketContext from '../../../../context/tickets/ticketContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormReactivate = ({ tickets }) => {
    const TicketContext = useContext(ticketContext)
    const { reactivateTicket } = TicketContext
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            description: '',
            status: 4
        },
        validationSchema: Yup.object({
            description: Yup.string().required('El campo es obligatorio'),
            status: Yup.number().required('El campo es obligatorio')
        }),
        onSubmit: async data => {
            await reactivateTicket(data, tickets)
            router.push('/dashboard')
        }
    })

    return (
        <div className="container">
            <div className="row">
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

                    <div className="input-field col s12">
                        <button
                            type="submit" 
                            className="btn waves-effect waves-light orange"
                        ><b>Reactivar</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormReactivate