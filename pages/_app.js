import AuthState from '../context/authentication/authState'
import CategoryState from '../context/categories/categoryState'
import StatusStates from '../context/states/statusState'
import MedioState from '../context/medios/medioState'
import ModuloState from '../context/modulos/moduloState'
import SolucionState from '../context/soluciones/solucionState'
import TicketState from '../context/tickets/ticketState'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthState>
            <CategoryState>
                <StatusStates>
                    <MedioState>
                        <ModuloState>
                            <SolucionState>
                                <TicketState>
                                    <Component {...pageProps} /></TicketState>                                
                            </SolucionState>
                        </ModuloState>
                    </MedioState>
                </StatusStates>
            </CategoryState>
        </AuthState>
    )
}

export default MyApp