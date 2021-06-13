import { useContext } from 'react'
import moduloContext from '../../context/modulos/moduloContext'
import { Button, Icon } from 'react-materialize'

const Module = ({ moduleRow, setShowForm, setTitle, setDataModule }) => {
    const ModuloContext = useContext(moduloContext)
    const { deleteModule } = ModuloContext
    const editModule = moduleRow => {
        setDataModule(moduleRow);
        setShowForm(true)
        setTitle('Editar módulo')
    }

    return (
        <tr>
            <td>{moduleRow.name}</td>
            <td>{moduleRow.description}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editModule(moduleRow)}
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
                    onClick={() => deleteModule(moduleRow.id) }
                />
            </td>
        </tr>
    )
}

export default Module