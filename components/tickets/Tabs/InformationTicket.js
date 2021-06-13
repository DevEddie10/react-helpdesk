import { Collection, CollectionItem, Icon } from 'react-materialize'
import Preloader from '../../../components/layout/Preloader'

const InformationTicket = ({ dataTicket }) => {

    if (Object.keys(dataTicket).length === 0) return <Preloader />

    return (
        <>
            <Collection>
                <CollectionItem className="avatar">
                    <img
                        alt="Not found"
                        className="circle"
                        src="/img/user.png"
                    />

                    <span className="card-title">Usuario: {dataTicket.user.name}</span>
                    <p><b>Ticket #: </b>{dataTicket.id}</p>
                    <p><b>Descripción: </b>{dataTicket.description}</p>
                    <p><b>Categoría: </b>{dataTicket.category.name}</p>
                    <p><b>Medio: </b>{dataTicket.medio.name}</p>
                    <p><b>Estado: </b>{dataTicket.state.name}</p>
                    <a className="secondary-content">
                        <Icon className="green-text text-darken-2">done</Icon>
                    </a>
                </CollectionItem>
            </Collection>

            {dataTicket.commentaries.length > 0 ? (
                <>
                    <div className="grey lighten-1 white-text mb-2">
                        <b className="divider-align">Comentarios</b>
                    </div>

                    <table className="responsive-table">
                        <thead className="grey lighten-3">
                            <tr>
                                <th>#</th>
                                <th>Especialista</th>
                                <th>Seguimientos</th>
                                <th>Creación</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataTicket.commentaries.map((commentary, index) => (
                                <tr key={commentary.id}>
                                    <td>{index + 1}</td>
                                    {commentary.specialist.id === 1 ? (
                                        <td>{commentary.specialist.name} - <b>Admin</b></td>
                                    ) : (
                                        <td>{commentary.specialist.name}</td>
                                    )}
                                    <td><p>{commentary.description}</p></td>
                                    <td><p>{commentary.created_at}</p></td>
                                    <td>
                                        {(() => {
                                            switch (commentary.status) {
                                                case 1:
                                                    return <span className="new badge green" data-badge-caption="Comentario"></span>
                                                case 2:
                                                    return <span className="new badge blue" data-badge-caption="Cerrado"></span>
                                                case 3:
                                                    return <span className="new badge purple" data-badge-caption="Reasignado"></span>
                                                case 4:
                                                    return <span className="new badge orange" data-badge-caption="Reactivado"></span>
                                                default:
                                                    return <span className="new badge orange" data-badge-caption="nulo"></span>
                                            }
                                        })()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <span className="red-text text-darken-2">
                    <b>No hay seguimientos</b>
                </span>
            )}

        </>
    )
}

export default InformationTicket