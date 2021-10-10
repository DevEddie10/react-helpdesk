import Link from 'next/link'
import useCountTicket from '../../../hooks/useCountTicket'

const Menu = () => {
    const { Count } = useCountTicket()

    if (!Count) return 'cargando...'

    return (
        <div id="card-stats">
            <div className="col s12 m6 l3">
                <div className="card light-green min-height-100 white-text hoverable">
                    <div className="padding-4">
                        <div className="col s7 m7">
                            <Link href="/monitoreo/[id]" as={`/monitoreo/2`}>
                                <a>
                                    <i className="material-icons icon-white background-round mt-5">assignment_ind</i>
                                </a>
                            </Link>
                            <p>Asignados</p>
                        </div>
                        <div className="col s5 m5 right-align">
                            <h5 className="mb-0">Total</h5>
                            <p className="no-margin">{Count.asignado}</p>
                            <Link href="/monitoreo/[id]" as={`/monitoreo/2`}>
                                <a className="white-text">
                                    <p className="no-margin"><u>Ver</u></p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s12 m6 l3">
                <div className="card amber min-height-100 white-text hoverable">
                    <div className="padding-4">
                        <div className="col s7 m7">
                            <Link href="/monitoreo/[id]" as={`/monitoreo/3`}>
                                <a>
                                    <i className="material-icons icon-white background-round mt-5">description</i>
                                </a>
                            </Link>
                            <p>Seguimientos</p>
                        </div>
                        <div className="col s5 m5 right-align">
                            <h5 className="mb-0">Total</h5>
                            <p className="no-margin">{Count.seguimiento}</p>
                            <Link href="/monitoreo/[id]" as={`/monitoreo/3`}>
                                <a className="white-text">
                                    <p className="no-margin"><u>Ver</u></p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s12 m6 l3">
                <div className="card blue min-height-100 white-text hoverable">
                    <div className="padding-4">
                        <div className="col s7 m7">
                            <Link href="/monitoreo/[id]" as={`/monitoreo/4`}>
                                <a>
                                    <i className="material-icons icon-white background-round mt-5 rotateMe">done</i>
                                </a>
                            </Link>
                            <p>Cerrados</p>
                        </div>
                        <div className="col s5 m5 right-align">
                            <h5 className="mb-0">Total</h5>
                            <p className="no-margin">{Count.cerrado}</p>
                            <Link href="/monitoreo/[id]" as={`/monitoreo/4`}>
                                <a className="white-text">
                                    <p className="no-margin"><u>Ver</u></p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s12 m6 l3 mb-3">
                <div className="card red lighten-2 min-height-100 white-text hoverable">
                    <div className="padding-4">
                        <div className="col s7 m7">
                            <Link href="/monitoreo/[id]" as={`/monitoreo/5`}>
                                <a>
                                    <i className="material-icons icon-white background-round mt-5 rotateMe">done_all</i>
                                </a>
                            </Link>
                            <p>Terminados</p>
                        </div>
                        <div className="col s5 m5 right-align">
                            <h5 className="mb-0">Total</h5>
                            <p className="no-margin">{Count.terminado}</p>
                            <Link href="/monitoreo/[id]" as={`/monitoreo/7`}>
                                <a className="white-text">
                                    <p className="no-margin"><u>Ver</u></p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu