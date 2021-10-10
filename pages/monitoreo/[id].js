import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clienteAxios from '../../config/axios'

const Monitoreo = () => {
    const [tickets, setTickets] = useState([])
    const router = useRouter()
    const { query: { id } } = router
   
    useEffect(() => {
        if (id) {
            ((async () => {
                const response = await clienteAxios.get(`/monitoreo/${id}`)
                setTickets(response.data.assignments)
            }))()
        }
    }, [id])

    return (
        <Layout>
            {(() => {
                switch (id) {
                    case '2':
                        return <h1 className="title-header">Asignados</h1>
                    case '3':
                        return <h1 className="title-header">Seguimientos</h1>
                    case '4':
                        return <h1 className="title-header">Cerrados</h1>
                    case '7':
                        return <h1 className="title-header">Terminados</h1>
                }
            })()}

            {tickets.length > 0 ? (
                <ul className="collection li-striped">
                    {tickets.map(ticket => (
                        <li key={ticket.id} className="collection-item avatar">
                            <div className="row">
                                <div className="col s12 xl6">
                                    {ticket.specialist.image ? (
                                        <img src={`${process.env.urlImage}${ticket.specialist.image}`} alt="" className="circle" />
                                    ) : (
                                        <img src="/img/user.png" alt="" className="circle" />
                                    )}

                                    <span className="chip">Especialista: <b>{ticket.specialist.name}</b></span>
                                    <p><b>Ticket: </b># {ticket.id}</p>
                                    <p><b>Usuario: </b>{ticket.user.name}</p>
                                    <p><b className="truncate">Descripción: </b>{ticket.description}</p>
                                    <p><b>Categoría: </b>{ticket.category.name}</p>
                                    <p><b>Medio: </b>{ticket.medio.name}</p>
                                    <p><b>Estado: </b>{ticket.state.name}</p>
                                </div>

                                <div className="col s12 xl5">
                                    {ticket.status == 4 || ticket.status == 2 ? (
                                        null
                                    ) : (
                                        <>
                                            {ticket.commentaries.map((commentary, index) => (
                                                <p key={commentary.id}><b>{index + 1}: </b>{commentary.description}</p>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>

                            {ticket.status == 4 ? (
                                <Link href="/terminados/[id]" as={`/terminados/${ticket.id}`}>
                                    <a className="btn-floating btn-small secondary-content blue darken-4">
                                        <i className="material-icons">playlist_add_check</i>
                                    </a>
                                </Link>
                            ) : (
                                <a className="icon-cursor secondary-content">
                                    <i className="material-icons green-text">comment</i>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            ) : <h1 className="title-header red-text text-darken-2">No hay tickets para mostrar</h1>}
        </Layout>
    )
}

export default Monitoreo