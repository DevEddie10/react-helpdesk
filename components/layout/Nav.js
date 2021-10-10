import { useEffect, useContext } from 'react'
import authContext from '../../context/authentication/authContext'
import Link from 'next/link'
import {
    Navbar,
    Icon,
    NavItem,
    Dropdown,
    Divider
} from 'react-materialize'
import SideNavMenu from './SideNavMenu'

const Nav = ({ user, logout }) => {
    const AuthContext = useContext(authContext)
    const { notifications, getNotifications,
        markAsNotification, markAllAsNotification
    } = AuthContext

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <Navbar
            className="bg-color"
            alignLinks="right"
            brand={<Link href="/"><a className="brand-logo ml-1"><b>Hola {user ? user.user.name : null}</b></a></Link>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                preventScrolling: true
            }}
            sidenav={<SideNavMenu user={user} />}
        >
            <Dropdown
                id="dropdown-notification"
                options={{
                    alignment: 'right',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: false,
                    container: null,
                    coverTrigger: false,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                }}
                trigger={
                    <a className='notification-container'>
                        {notifications.length > 0 ? (
                            <>
                                <i className="material-icons">notifications</i>
                                <span className="notification-counter">{notifications.length}</span>
                            </>
                        ) : (
                            <>
                                <i className="material-icons">notifications</i>
                            </>
                        )}
                    </a>
                }
            >
                <Link href="/asignaciones">
                    <a>
                        <Icon className="black-text">assignment</Icon>Bandeja de tickets
                    </a>
                </Link>

                {notifications.length > 0 && (
                    <>
                        {notifications.map((notification, index) => (
                            <Link href={`${notification.data.url}`} key={index + 1}>
                                <a onClick={() => markAsNotification(notification)}>
                                    <Icon className="black-text">trending_flat</Icon>
                                    {notification.data.text}
                                </a>
                            </Link>
                        ))}
                    </>
                )}

                <Divider />
                {notifications.length > 0 && (
                    <a
                        onClick={() => markAllAsNotification()}
                    >
                        <Icon className="blue-text">done_all</Icon>Marcar todos leidos
                    </a>
                )}
            </Dropdown>

            <NavItem>
                <b>{user ? (
                    user.user.roles.map(userole => (
                        userole.display_name
                    ))
                ) : null}</b>
            </NavItem>

            <Dropdown
                id="Dropdown_6"
                options={{
                    alignment: 'left',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: false,
                    container: null,
                    coverTrigger: false,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                }}
                trigger={<a><Icon>more_vert</Icon></a>}
            >
                <Link href="/perfil">
                    <a>
                        <Icon className="black-text">person</Icon>Perfil
                    </a>
                </Link>

                <Link href="/editarusuario">
                    <a>
                        <Icon className="black-text">edit</Icon>Editar
                    </a>
                </Link>

                <Divider />
                <a
                    onClick={() => logout()}
                >
                    <Icon className="black-text">input</Icon>Cerrar sesion
                </a>
            </Dropdown>
        </Navbar>
    )
}

export default Nav