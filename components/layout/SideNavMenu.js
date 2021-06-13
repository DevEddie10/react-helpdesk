import React from 'react'
import { SideNavItem, Icon } from 'react-materialize'
import CollapsibleMenu from './CollapsibleMenu'

const SideNavMenu = ({ user }) => {
    return (
        <>
            <SideNavItem
                user={{
                    background: '/img/office.jpg',
                    email: `${user ? user.user.email : null}`,
                    image: '/img/user.png',
                    name: `${user ? user.user.name : null}`
                }}
                userView
            />
            <SideNavItem
                href="#!icon"
                icon={<Icon>home</Icon>}
            >
                Inicio
            </SideNavItem>
            
            <SideNavItem href="#!second">
                Laravel + Next Js
            </SideNavItem>

            <SideNavItem divider />

            <SideNavItem subheader>
                Helpdesk
            </SideNavItem>

            <CollapsibleMenu
                user={user} 
            />
        </>
    )
}

export default SideNavMenu