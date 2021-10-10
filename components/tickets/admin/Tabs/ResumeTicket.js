import Preloader from '../../../layout/Preloader'
import Moment from 'react-moment'
import 'moment/locale/es'

const ResumeTicket = ({ tickets }) => {
    if (Object.keys(tickets).length === 0) return <Preloader />
    
    return (
        <div>
            <ul className="collection">
                <li className="collection-item avatar">
                    {tickets.user.image ? (
                        <img src={`${process.env.urlImage}${tickets.user.image}`} alt="" className="circle" />
                    ) : (
                        <img src="/img/user.png" alt="" className="circle" />
                    )}

                    <div className="mb-1">
                        <span className="card-title">Usuario: {tickets.user.name}</span>
                        <p><b>Descripción: </b> {tickets.description}</p>
                    </div>

                    <div className="row">
                        <div className="col s12 xl6">
                            <p><b>Ticket #: </b> {tickets.id}</p>
                            <p><b>Especialista: </b> {tickets.specialist.name}</p>
                            <p><b>Categoría: </b> {tickets.category.name}</p>
                            <p><b>Fecha: </b> <Moment fromNow>{tickets.created_at}</Moment></p>
                        </div>

                        <div className="col s12 xl6">
                            <p><b>Medio: </b> {tickets.medio.name}</p>
                            <p><b>Estado:</b> {tickets.state.name}</p>
                            <p><b>Módulo:</b> {tickets.module.name}</p>
                            <p><b>Solución:</b> {tickets.solution.name}</p>
                        </div>
                    </div>

                    <span className="card-title mt-1">Seguimientos</span>
                    <TableCommentaries
                        commentaries={tickets.commentaries}
                    />

                    <a href="#!" className="secondary-content">
                        <i className="material-icons green-text">done_all</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default ResumeTicket

function TableCommentaries({ commentaries }) {

    return (
        <table className="mt-1 responsive-table">
            <thead className="grey lighten-3">
                <tr>
                    <th>#</th>
                    <th>Especialista</th>
                    <th></th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                </tr>
            </thead>

            <tbody>
                {commentaries.map((commentary, index) => (
                    <tr key={commentary.id}>
                        <td>{index + 1}</td>
                        <td>{commentary.specialist.name}</td>
                        <td>
                            {commentary.specialist.image ? (
                                <img src={`${process.env.urlImage}${commentary.specialist.image}`} alt="especialista" className="responseive-img img-circle" />
                            ) : (
                                <img src="/img/user.png" alt="sin especialista" className="responseive-img img-circle" height="50" width="50" />
                            )}
                        </td>
                        <td>{commentary.description}</td>
                        <td><Moment fromNow>{commentary.created_at}</Moment></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}