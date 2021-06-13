import { useState } from 'react'
import { CollectionItem, Icon } from 'react-materialize'

const TicketUsuario = ({ user }) => {
    const [showCommentaries, setshowCommentaries] = useState(false)

    return (
        <CollectionItem className="avatar">
            <div className="row">
                <div className="col s12 m6">
                    {user.specialist && user.specialist.name ? (
                        <img
                            alt="Not found"
                            className="circle"
                            src="img/user.png"
                        />
                    ) : null}
                    <span className="card-title">Ticket # {user.id}</span>
                    <p><b className="truncate">Descripción: </b>{user.description}</p>
                    <p><b>Categoría: </b>{user.category.name}</p>
                    <p><b>Medio: </b>{user.medio.name}</p>
                    <p><b>Estado: </b>{user.state.name}</p>
                    {user.specialist && user.specialist.name ? (
                        <p><b>Especialista: </b>{user.specialist.name}</p>
                    ) : null}
                    {(() => {
                        switch (user.status) {
                            case 1:
                                return <p><b>Estatus</b> <b className="red-text text-darken-1">Nuevo</b></p>
                            case 2:
                                return <p><b>Estatus</b> <b className="light-green-text">Asignado</b></p>
                            case 3:
                                return <p><b>Estatus</b> <b className="amber-text">Seguimiento</b></p>
                            case 4:
                                return <p><b>Estatus</b> <b className="blue-text text-darken-1">Cerrado</b></p>
                            case 5:
                                return <p><b>Estatus: </b> <b className="purple-text">Reasignado</b></p>
                            case 6:
                                return <p><b>Estatus: </b> <b className="orange-text">Reactivado</b></p>
                            case 7:
                                return <p><b>Estatus: </b> <b className="red-text">Terminado</b></p>
                        }
                    })()}
                </div>

                <div className="col s12 m6">
                    {showCommentaries ? (
                        <>
                            {user.commentaries.length > 0 ? (
                                <>
                                    <span className="card-title">Seguimientos</span>
                                    {user.commentaries.map((commentary, index) => (
                                        <div key={commentary.id}>
                                            <p><b>{index + 1}</b> - {commentary.description}</p>
                                        </div>
                                    ))}
                                </>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>

            <a
                className="secondary-content"
                onClick={() => setshowCommentaries(!showCommentaries)}
            >
                {user.commentaries.length > 0 ? (
                    <Icon className="green-text text-darken-3 icon-cursor">comment</Icon>
                ) : (
                    <Icon className="red-text text-darken-3">block</Icon>
                )}
            </a>
        </CollectionItem>
    )
}

export default TicketUsuario