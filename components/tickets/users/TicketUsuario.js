import { CollectionItem, Icon } from 'react-materialize'
import Moment from 'react-moment';
import 'moment/locale/es'

const TicketUsuario = ({ user }) => {
    
    return (
        <CollectionItem className="avatar">
            <div className="row">
                <div className="col s12 m6">
                    {user.specialist && user.specialist.name ? (
                        <img
                            alt="nombre"
                            className="circle"
                            src={`${process.env.urlImage}${user.specialist.image}`}
                        />
                    ) : (
                        <img
                            alt="Not found"
                            className="circle"
                            src="img/user.png"
                        />
                    )}
                    {user.specialist && user.specialist.name ? (
                        <span className="chip">Especialista: <b>{user.specialist.name}</b></span>
                    ) : null}
                    
                    <span className="card-title">Ticket # {user.id} - <Moment fromNow>{user.created_at}</Moment></span>
                    <p><b className="truncate">Descripción: </b>{user.description} - </p>
                    <p><b>Categoría: </b>{user.category.name}</p>
                    <p><b>Medio: </b>{user.medio.name}</p>
                    <p><b>Estado: </b>{user.state.name}</p>
                    
                    {(() => {
                        switch (user.status) {
                            case 1:
                                return <p><span className="new badge left red darken-1" data-badge-caption=""><b>Nuevo</b></span></p>
                            case 2:
                                return <p><span className="new badge left light-green" data-badge-caption=""><b>Asignado</b></span></p>
                            case 3:
                                return <p><span className="new badge left amber" data-badge-caption=""><b>Seguimiento</b></span></p>
                            case 4:
                                return <p><span className="new badge left blue darken-1" data-badge-caption=""><b>Cerrado</b></span></p>
                            case 5:
                                return <p><span className="new badge left purple" data-badge-caption=""><b>Reasignado</b></span></p>
                            case 6:
                                return <p><span className="new badge left orange" data-badge-caption=""><b>Reactivado</b></span></p>
                            case 7:
                                return <p><span className="new badge left red" data-badge-caption=""><b>Terminado</b></span></p>
                        }
                    })()}
                </div>

                <div className="col s12 m6">
                    {user.commentaries.length > 0 ? (
                        <>
                            <span className="card-title">Seguimientos</span>
                            {user.commentaries.map((commentary, index) => (
                                <div key={commentary.id}>
                                    <p><b>{index + 1}</b> - {commentary.description}</p>
                                </div>
                            ))}
                        </>
                    ) : <h1 className="red-text card-title">Sin seguimientos</h1>}
                </div>
            </div>

            <a className="secondary-content">
                {user.commentaries.length > 0 ? (
                    <Icon className="green-text text-darken-3 icon-cursor">comment</Icon>
                ) : (
                    <Icon className="red-text text-darken-3 icon-cursor">block</Icon>
                )}
            </a>
        </CollectionItem>
    )
}

export default TicketUsuario