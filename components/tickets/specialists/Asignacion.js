import Link from 'next/link'
import { CollectionItem, Icon } from 'react-materialize'
import Moment from 'react-moment';
import 'moment/locale/es'

const Asignacion = ({ assign }) => {

    return (
        <CollectionItem className="avatar">
            {assign.user && assign.user.image ? (
                <img
                    alt="Not found"
                    className="circle"
                    src={`${process.env.urlImage}${assign.user.image}`}
                />
            ) : (
                <img
                    alt="Not found"
                    className="circle"
                    src="img/user.png"
                />
            )}

            <div className="mb-1">
                <span className="chip">Usuario: <b>{assign.user.name}</b></span>
                <p className="card-title"><b>Ticket #: </b>{assign.id} - <Moment fromNow>{assign.created_at}</Moment></p>
            </div>

            <div className="row">
                <div className="col s12 mb-1">
                    <p><b >Descripción: </b>{assign.description}</p>
                </div>
                <div className="col s12 xl6">
                    <p><b>Categoría: </b>{assign.category.name}</p>
                    <p><b>Medio: </b>{assign.medio.name}</p>
                </div>

                <div className="col s12 xl6">
                    <p><b>Estado: </b>{assign.state.name}</p>
                    {(() => {
                        switch (assign.status) {
                            case 2:
                                return <span className="new badge green left" data-badge-caption="Asignado"></span>
                            case 3:
                                return <span className="new badge amber left" data-badge-caption="Seguimiento"></span>
                            case 5:
                                return <span className="new badge purple left" data-badge-caption="Reasignado"></span>
                            case 6:
                                return <span className="new badge orange left" data-badge-caption="Reactivado"></span>
                            default:
                                return <span className="new badge red left" data-badge-caption="--"></span>
                        }
                    })()}
                </div>
            </div>

            <Link href="/seguimientos/[id]" as={`/seguimientos/${assign.id}`}>
                <a
                    className="secondary-content bg-color btn-floating mt-1"
                >
                    <Icon>remove_red_eye</Icon>
                </a>
            </Link>
        </CollectionItem>
    )
}

export default Asignacion