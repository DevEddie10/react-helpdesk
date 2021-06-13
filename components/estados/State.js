import { useContext } from 'react'
import stateContext from '../../context/states/stateContext'
import { Button, Icon } from 'react-materialize'

const State = ({ rowState, setShowForm, setTitle, setDataState }) => {
    const StateContext = useContext(stateContext)
    const { deleteState } = StateContext
    const editState = rowState => {
        setDataState(rowState);
        setShowForm(true)
        setTitle('Editar estado')
    }

    return (
        <tr>
            <td>{rowState.name}</td>
            <td>{rowState.description}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editState(rowState)}
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
                    onClick={() => deleteState(rowState.id) }
                />
            </td>
        </tr>
    )
}

export default State
