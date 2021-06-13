import { useState } from 'react'
import Layout from '../components/layout/Layout'
import useStatus from '../hooks/useStatus'
import { Table, Button, Icon } from 'react-materialize'
import State from '../components/estados/State'
import TableHead from '../components/layout/ui/TableHead'
import FormState from '../components/estados/FormState'

const Estados = () => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de estados')
    const [dataState, setDataState] = useState(null)
    const { status } = useStatus()

    const openForm = () => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de estados')
            setDataState(null)
        } else {
            setShowForm(true)
            setTitle('Registro de estado')
            setDataState(null)
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
                <FormState
                    setShowForm={setShowForm} 
                    dataState={dataState}
                />
            ) : (
                <>
                    {status.length > 0 ? (
                        <Table
                            responsive={true}
                        >
                            <TableHead />

                            <tbody>
                                {status.map(rowState => (
                                    <State
                                        key={rowState.id}
                                        rowState={rowState}
                                        setShowForm={setShowForm}
                                        setTitle={setTitle}
                                        setDataState={setDataState}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : <strong className="red-text text-darken-2">No hay estados registrados</strong>}
                </>
            )}
        </Layout>
    )
}

export default Estados