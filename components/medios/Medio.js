import { useContext } from 'react'
import { Button, Icon } from 'react-materialize'
import medioContext from '../../context/medios/medioContext'

const Medio = ({ medio, setTitle, setShowForm, setDataMedio }) => {
    const MedioContext = useContext(medioContext)
    const { deleteMedio } = MedioContext

    const editMedio = data => {
        setTitle('Editar medio')
        setShowForm(true)
        setDataMedio(data)
    }

    return (
        <tr>
            <td>{medio.name}</td>
            <td>{medio.description}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editMedio(medio)}
                />
            </td>
            <td>
                <Button
                    className="red"
                    floating
                    icon={<Icon>remove</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => deleteMedio(medio.id)}
                />
            </td>
        </tr>
    )
}

export default Medio