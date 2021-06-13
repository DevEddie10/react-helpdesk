import { useState } from 'react'
import Layout from '../components/layout/Layout'
import useModule from '../hooks/useModule'
import { Table, Button, Icon } from 'react-materialize'
import Module from '../components/modulos/Module'
import TableHead from '../components/layout/ui/TableHead'
import FormModule from '../components/modulos/FormModule'

const Modules = () => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de Modulos')
    const [dataModule, setDataModule] = useState(null)
    const { modules } = useModule()

    const openForm = () => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de Modulos')
            setDataModule(null)
        } else {
            setShowForm(true)
            setTitle('Registro de módulo')
            setDataModule(null)
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
                <FormModule
                    setShowForm={setShowForm} 
                    dataModule={dataModule}
                />
            ) : (
                <>
                    {modules.length > 0 ? (
                        <Table
                            responsive={true}
                        >
                            <TableHead />

                            <tbody>
                                {modules.map(moduleRow => (
                                    <Module
                                        key={moduleRow.id}
                                        moduleRow={moduleRow}
                                        setShowForm={setShowForm}
                                        setTitle={setTitle}
                                        setDataModule={setDataModule}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : <strong className="red-text text-darken-2">No hay modulos registrados</strong>}
                </>
            )}
        </Layout>
    )
}

export default Modules