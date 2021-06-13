import { useState } from 'react'
import Layout from '../components/layout/Layout'
import useSolution from '../hooks/useSolution'
import { Table, Button, Icon } from 'react-materialize'
import Solution from '../components/soluciones/Solution'
import TableHead from '../components/layout/ui/TableHead'
import FormSolution from '../components/soluciones/FormSolution'

const Solutions = () => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de soluciones')
    const [dataSolution, setDataSolution] = useState(null)
    const { solutions } = useSolution()

    const openForm = () => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de soluciones')
            setDataSolution(null)
        } else {
            setShowForm(true)
            setTitle('Registro de solución')
            setDataSolution(null)
        }
    }

    return (
        <Layout>
            <h1 className="title-header">{title}</h1>

            <Button
                className={showForm ? 'red' : 'green'}
                fab
                floating
                node="button"
                large
                icon={showForm ? <Icon>arrow_back</Icon> : <Icon>add_circle_outline</Icon>}
                onClick={() => openForm(title)}
            />

            {showForm ? (
                <FormSolution
                    setShowForm={setShowForm} 
                    dataSolution={dataSolution}
                />
            ) : (
                <>
                    {solutions.length > 0 ? (
                        <Table
                            responsive={true}
                        >
                            <TableHead />

                            <tbody>
                                {solutions.map(solution => (
                                    <Solution
                                        key={solution.id}
                                        solution={solution}
                                        setShowForm={setShowForm}
                                        setTitle={setTitle}
                                        setDataSolution={setDataSolution}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : <strong className="red-text text-darken-2">No hay soluciones registradas</strong>}
                </>
            )}
        </Layout>
    )
}

export default Solutions