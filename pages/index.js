import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import authContext from '../context/authentication/authContext'

export default function Home() {
    const router = useRouter()
    const AuthContext = useContext(authContext)
    const { authenticated, initNotifications } = AuthContext

    useEffect(() => {
        if (!authenticated) {
            router.push('/login')
        }

        initNotifications()
    }, [])

    return (
        <Layout>
            <h3><b>BIENVENIDO</b></h3>
        </Layout>
    )
}