import { useContext } from 'react'
import { Button, Icon } from 'react-materialize'
import categoryContext from '../../context/categories/categoryContext'

const Categoria = ({ category, setTitle, setShowForm, setDataCategory }) => {
    const CategoryContext = useContext(categoryContext)
    const { deleteCategory } = CategoryContext

    const editCategory = data => {
        setTitle('Editar Categoría')
        setShowForm(true)
        setDataCategory(data)
    }

    return (
        <tr>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
                <Button
                    className="blue"
                    floating
                    icon={<Icon>edit</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={() => editCategory(category)}
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
                    onClick={() => deleteCategory(category.id)}
                />
            </td>
        </tr>
    )
}

export default Categoria