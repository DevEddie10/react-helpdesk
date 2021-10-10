import { Collection, CollectionItem, Icon } from 'react-materialize'
import Preloader from '../../../../components/layout/Preloader'
import Moment from 'react-moment'
import 'moment/locale/es'

const InformationTicket = ({ dataTicket }) => {

    if (Object.keys(dataTicket).length === 0) return <Preloader />

    return (
        <>
            <Collection>
                <CollectionItem className="avatar">
                    {dataTicket.user && dataTicket.user.image ? (
                        <img
                            alt="Not found"
                            className="circle"
                            src={`${process.env.urlImage}${dataTicket.user.image}`}
                        />
                    ) : (
                        <img
                            alt="Not found"
                            className="circle"
                            src="img/user.png"
                        />
                    )}

                    <span className="chip">Usuario: <b>{dataTicket.user.name}</b></span>

                    <div className="col s12 mb-1">
                        <p><b>Descripción: </b>{dataTicket.description}</p>
                    </div>

                    <div className="col s12 l6">
                        <p><b>Ticket #: </b>{dataTicket.id}</p>
                        <p><b>Categoría: </b>{dataTicket.category.name}</p>
                    </div>

                    <div className="col s12 l6 mb-1">
                        <p><b>Medio: </b>{dataTicket.medio.name}</p>
                        <p><b>Estado: </b>{dataTicket.state.name}</p>
                    </div>

                    <a className="secondary-content">
                        <Icon className="green-text text-darken-2">done</Icon>
                    </a>
                </CollectionItem>
            </Collection>

            {dataTicket.commentaries.length > 0 ? (
                <>
                    <div className="divider-align">
                        <p>Comentarios</p>
                    </div>

                    <table className="responsive-table">
                        <thead className="grey lighten-3">
                            <tr>
                                <th>#</th>
                                <th>Especialista</th>
                                <th>Seguimientos</th>
                                <th>Fecha</th>
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
                                    <td><p><Moment fromNow>{commentary.created_at}</Moment></p></td>
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