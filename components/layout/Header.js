import { useEffect, useContext } from 'react'
import authContext from '../../context/authentication/authContext'
import Nav from './Nav'
import { SideNav } from 'react-materialize'
import SideNavMenu from './SideNavMenu'

const Header = () => {

    const AuthContext = useContext(authContext)
    const { token, userAuthentication, user, logout } = AuthContext

    useEffect(() => {
        if (token) {
            userAuthentication()
        }
    }, [])

    return (
        <header>
            <Nav
                user={user}
                logout={logout}
            />

            <SideNav
                id="SideNav-10"
                options={{
                    draggable: true
                }}
            >
                <SideNavMenu
                    user={user}
                    logout={logout}
                />
            </SideNav>
        </header>
    )
}

export default Header