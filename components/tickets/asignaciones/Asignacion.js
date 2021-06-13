import Link from 'next/link'
import { CollectionItem, Icon } from 'react-materialize'

const Asignacion = ({ assign }) => {

    return (
        <CollectionItem className="avatar">
            <img
                alt="Not found"
                className="circle"
                src="img/user.png"
            />

            <span className="card-title">Ticket #: {assign.id}</span>

            <div className="row">
                <div className="col s12 xl6">
                    <p><b>Usuario: </b>{assign.user.name}</p>
                    <p align="justify"><b className="truncate">Descripción: </b>{assign.description}</p>
                    <p><b>Categoría: </b>{assign.category.name}</p>
                </div>

                <div className="col s12 xl6">
                    <p><b>Medio: </b>{assign.medio.name}</p>
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