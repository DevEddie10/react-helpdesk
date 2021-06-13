import { useState } from 'react'
import Layout from '../components/layout/Layout'
import useMedios from '../hooks/useMedios'
import { Table, Button, Icon } from 'react-materialize'
import TableHead from '../components/layout/ui/TableHead'
import FormMedio from '../components/medios/FormMedio'
import Medio from '../components/medios/Medio'

const Medios = () => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de medios')
    const [dataMedio, setDataMedio] = useState(null)
    const { medios } = useMedios()

    const openForm = (showForm) => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de medios')
            setDataMedio(null)

        } else {
            setShowForm(true)
            setTitle('Registro medio')
            setDataMedio(null)
        }
    }

    return (
        <Layout>
            <h1 className="title-header">{title}</h1>

            <Button
                className={`${showForm ? 'red' : 'green'}`}
                fab
                floating
                node="button"
                large
                icon={showForm ? <Icon>arrow_back</Icon> : <Icon>add_circle_outline</Icon>}
                onClick={() => openForm(showForm)}
            />

            {showForm ? (
                <FormMedio
                    setShowForm={setShowForm}
                    dataMedio={dataMedio}
                />
            ) : (
                <>
                    {medios.length > 0 ? (
                        <Table
                            responsive={true}
                        >
                            <TableHead />

                            <tbody>
                                {medios.map(medio => (
                                    <Medio
                                        key={medio.id}
                                        medio={medio}
                                        setTitle={setTitle}
                                        setShowForm={setShowForm}
                                        setDataMedio={setDataMedio}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : <strong className="red-text text-darken-2">No hay medios registrados</strong>}
                </>
            )}
        </Layout>
    )
}

export default Medios