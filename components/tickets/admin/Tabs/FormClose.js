import { useContext } from 'react'
import ticketContext from '../../../../context/tickets/ticketContext'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormClose = ({ tickets }) => {
    const TicketContext = useContext(ticketContext)
    const { finishedTicket } = TicketContext
    const router = useRouter()
    
    const formik = useFormik({
        initialValues: {
            description: '',
            status: 5
        },
        validationSchema: Yup.object({
            description: Yup.string().required('El campo es obligatorio'),
            status: Yup.number().required('El campo es obligatorio')
        }),
        onSubmit: async data => {
            await finishedTicket(data, tickets)
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
                            id="desc-f" 
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="desc-f">Descripcion</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.description}</b>
                        </span>
                    </div>

                    <div className="input-field col s12">
                        <button
                            type="submit" 
                            className="btn waves-effect waves-light red lighten-2"
                        ><b>terminar</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormClose