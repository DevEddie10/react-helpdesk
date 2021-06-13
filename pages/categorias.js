import { useState } from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Table, Button, Icon } from 'react-materialize'
import FormCategory from '../components/categorias/FormCategory'
import Category from '../components/categorias/Categoria'
import TableHead from '../components/layout/ui/TableHead'

const Categorias = () => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('Listado de categorias')
    const [dataCategory, setDataCategory] = useState(null)
    const { categories } = useCategory()

    const openModal = showForm => {
        if (showForm) {
            setShowForm(false)
            setTitle('Listado de categorias')
            setDataCategory(null)

        } else {
            setShowForm(true)
            setTitle('Registro categoría')
            setDataCategory(null)
        }
    }

    return (
        <Layout>
            <Button
                className={`${showForm ? 'red' : 'green'}`}
                fab
                floating
                node="button"
                large
                icon={showForm ? <Icon>arrow_back</Icon> : <Icon>add_circle_outline</Icon>}
                onClick={() => openModal(showForm)}
            />

            <h1 className="title-header">{title}</h1>

            {showForm ? (
                <FormCategory
                    setShowForm={setShowForm}
                    dataCategory={dataCategory}
                />
            ) : (
                <>
                    {categories.length > 0 ? (
                        <Table
                            responsive={true}
                        >
                            <TableHead />

                            <tbody>
                                {categories.map(category => (
                                    <Category
                                        key={category.id}
                                        category={category}
                                        setTitle={setTitle}
                                        setShowForm={setShowForm}
                                        setDataCategory={setDataCategory}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : <strong className="red-text text-darken-2">No hay categorias registradas</strong>}
                </>
            )}
        </Layout>
    )
}

export default Categorias