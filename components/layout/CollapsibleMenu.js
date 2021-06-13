import Link from 'next/link'
import {
    Collapsible,
    CollapsibleItem,
    Icon
} from 'react-materialize'

const CollapsibleMenu = ({ user }) => {

    return (
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={<b className="grey-text text-darken-2">Registro de tickets</b>}
                icon={<Icon>add_circle_outline</Icon>}
                node="div"
            >
                <div>
                    <Link href="/registro">
                        <a className="collapsible-menu">* registro</a>
                    </Link>
                </div>
            </CollapsibleItem>

            {user && user.user.roles ? (
                user.user.roles.map((role, index) => (
                    <Collapsible key={role + index}>
                        {role.name === 'admin' ? (
                            <CollapsibleItem
                                expanded={false}
                                header={<b className="grey-text text-darken-2">Catalogos</b>}
                                icon={<Icon>menu</Icon>}
                                node="div"
                            >
                                <div>
                                    <Link href="/categorias">
                                        <a className="collapsible-menu">* Categorias</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/estados">
                                        <a className="collapsible-menu">* Estados</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/medios">
                                        <a className="collapsible-menu">* Medio</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/modulos">
                                        <a className="collapsible-menu">* Modulos</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/soluciones">
                                        <a className="collapsible-menu">* Soluciones</a>
                                    </Link>
                                </div>
                            </CollapsibleItem>
                        ) : null}
                    </Collapsible>
                ))
            ) : null}

            {user && user.user.roles ? (
                user.user.roles.map((role, index) => (
                    <Collapsible key={role + index}>
                        {role.name === 'admin' ? (
                            <CollapsibleItem
                                expanded={false}
                                header={<b className="grey-text text-darken-2">Helpdesk</b>}
                                icon={<Icon>dashboard</Icon>}
                                node="div"
                            >
                                <div>
                                    <Link href="/dashboard">
                                        <a className="collapsible-menu">* Listado de tickets</a>
                                    </Link>
                                </div>
                            </CollapsibleItem>
                        ) : null}
                    </Collapsible>
                ))
            ) : null}

            {user && user.user.roles ? (
                user.user.roles.map((role, index) => (
                    <Collapsible key={role + index}>
                        {role.name === 'specialist' ? (
                            <CollapsibleItem
                                expanded={false}
                                header={<b className="grey-text text-darken-2">Asignaciones</b>}
                                icon={<Icon>assignment</Icon>}
                                node="div"
                            >
                                <div>
                                    <Link href="/asignaciones">
                                        <a className="collapsible-menu">* Seguimientos</a>
                                    </Link>
                                </div>
                            </CollapsibleItem>
                        ) : null}
                    </Collapsible>
                ))
            ) : null}

            {user && user.user.roles ? (
                user.user.roles.map((role, index) => (
                    <Collapsible key={role + index}>
                        {role.name === 'admin' ? (
                            <CollapsibleItem
                                expanded={false}
                                header={<b className="grey-text text-darken-2">Usuarios</b>}
                                icon={<Icon>person_pin</Icon>}
                                node="div"
                            >
                                <div>
                                    <Link href="/usuarios">
                                        <a className="collapsible-menu">* Listado</a>
                                    </Link>
                                </div>

                                <div>
                                    <Link href="/usuarios">
                                        <a className="collapsible-menu">* Permisos</a>
                                    </Link>
                                </div>
                            </CollapsibleItem>
                        ) : null}
                    </Collapsible>
                ))
            ) : null}

        </Collapsible>
    )
}

export default CollapsibleMenu