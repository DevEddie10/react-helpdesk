import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Helpdesk Laravel</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </Head>

            {router.pathname === '/login' ? (
                <div className="bg-login">
                    <div className="container-flex">
                        <div className="form-flex">
                            <div className="row card">
                                <div className="card-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Header />

                    <main className="row">
                        <div className="col s12">
                            <div className="card hoverable">
                                <div className="card-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    )
}

export default Layout