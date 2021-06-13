import { useEffect } from 'react'
import InformationTicket from './Tabs/InformationTicket'
import FormCommentary from './Tabs/FormCommentary'
import FormReasign from './Tabs/FormReasign'
import FormConcludeTicket from './Tabs/FormConcludeTicket'

const Tracking = ({ dataTicket }) => {

    useEffect(() => {
        let tabs = document.querySelector(".tabs")
        M.Tabs.init(tabs)
    }, [])

    return (
        <div className="row">
            <ul className="tabs tabs-fixed-width tab-demo z-depth-1 mb-3">
                <li className="tab">
                    <a className="active" href="#information">Información</a>
                </li>
                <li className="tab">
                    <a className="active" href="#form-commentary">Seguimiento</a>
                </li>
                <li className="tab">
                    <a href="#reasign">Reasignar</a>
                </li>
                <li className="tab"><a href="#close">Cerrar</a></li>
            </ul>

            <div id="information" className="col s12">
                <InformationTicket
                    dataTicket={dataTicket}
                />
            </div>

            <div id="form-commentary" className="col s12">
                <FormCommentary
                    dataTicket={dataTicket}
                />
            </div>

            <div id="reasign" className="col s12">
                <FormReasign
                    dataTicket={dataTicket} 
                />
            </div>

            <div id="close" className="col s12">
                <FormConcludeTicket
                    dataTicket={dataTicket} 
                />
            </div>
        </div>
    )
}

export default Tracking