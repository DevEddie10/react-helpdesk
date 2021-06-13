import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import clienteAxios from '../../config/axios'
import FormReactivate from '../../components/tickets/Tabs/terminados/FormReactivate'
import FormClose from '../../components/tickets/Tabs/terminados/FormClose'
import ResumeTicket from '../../components/tickets/Tabs/terminados/ResumeTicket'

const Terminados = () => {
    const router = useRouter()
    const { query: { id } } = router
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        if (id) {
            ((async () => {
                const response = await clienteAxios.get(`/terminar/${id}`)
                setTickets(response.data.result)
            }))()
        }
    }, [id])

    useEffect(() => {
        let tabs = document.querySelector(".tabs")
        M.Tabs.init(tabs)
    }, [])

    return (
        <Layout>
            <h1 className="title-header">Validación especialista</h1>

            <ul className="tabs tabs-fixed-width tab-demo z-depth-1 mb-3">
                <li className="tab">
                    <a className="active" href="#information">Resumen</a>
                </li>
                <li className="tab">
                    <a href="#reactivate">Reactivar</a>
                </li>
                <li className="tab">
                    <a href="#close">Terminar</a>
                </li>
            </ul>

            <div className="row">
                <div id="information" className="col s12">
                    <ResumeTicket
                        tickets={tickets} 
                    />
                </div>
                <div id="reactivate" className="col s12">
                    <FormReactivate
                        tickets={tickets} 
                    />
                </div>
                <div id="close" className="col s12">
                    <FormClose
                        tickets={tickets}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Terminados