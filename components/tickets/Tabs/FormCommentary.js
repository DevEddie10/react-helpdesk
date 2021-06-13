import { useState, useContext } from 'react'
import ticketContext from '../../../context/tickets/ticketContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormCommentary = ({ dataTicket }) => {
    const TicketContext = useContext(ticketContext)
    const { addCommentary } = TicketContext
    const [btnDisable, setBtnDisable] = useState('')

    const formik = useFormik({
        initialValues: {
            description: '',
            status: 1
        },
        validationSchema: Yup.object({
            description: Yup.string().required('El campo es obligatorio')
        }),
        onSubmit: async data => {
            setBtnDisable('disabled')
            await addCommentary(data, dataTicket)
            formik.resetForm()
            M.updateTextFields();
            let tabs = document.querySelector("ul.tabs")
            let instance = M.Tabs.init(tabs)
            instance.select('information')
            setBtnDisable(null)
        }
    })

    if (Object.keys(dataTicket).length === 0) return null

    return (
        <div className="container">
            <div className="row">
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="input-field col s12 xl10">
                        <i className="material-icons prefix">description</i>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="description">Descripción</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.description}</b>
                        </span>
                    </div>

                    <div className="input-field col s12">
                        <button
                            type="submit"
                            className={`btn waves-effect waves-light green ${btnDisable}`}
                        ><b>Registrar</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCommentary