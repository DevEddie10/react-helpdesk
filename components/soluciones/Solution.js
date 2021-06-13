import { useContext } from 'react'
import solucionContext from '../../context/soluciones/solucionContext'
import { Button, Icon } from 'react-materialize'

const Module = ({ solution, setShowForm, setTitle, setDataSolution }) => {
    const SolucionContext = useContext(solucionContext)
    const { deleteSolution } = SolucionContext
    const editSolution = solution => {
        setDataSolution(solution);
        setShowForm(true)
        setTitle('Editar solución')
    }

    return (
        <tr>
            <td>{solution.name}</td>
            <td>{solution.description}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editSolution(solution)}
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
                    onClick={() => deleteSolution(solution.id) }
                />
            </td>
        </tr>
    )
}

export default Module