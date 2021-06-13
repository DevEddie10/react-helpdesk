import { useEffect, useContext } from 'react'
import categoryContext from '../context/categories/categoryContext'

const useCategory = () => {
    const CategoryContext = useContext(categoryContext)
    const { categories, getCategories } = CategoryContext
    
    useEffect(() => {
        getCategories()
    }, [])

    return {
        categories
    }
}

export default useCategory