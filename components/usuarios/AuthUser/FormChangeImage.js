import { useState, useContext } from 'react'
import authContext from '../../../context/authentication/authContext'

const FormChangeImage = () => {
    const AuthContext = useContext(authContext)
    const { uploadFile } = AuthContext
    const [image, setImage] = useState(null)

    const changeImagen = e => {
        setImage(e.target.files[0])
    }

    return (
        <>
            <h1 className="title-header">Editar avatar</h1>

            <div className="row">
                <form>
                    <div className="input-field col s12 l6">
                        <div className="file-field input-field">
                            <div className="btn green">
                                <i className="material-icons">file_upload</i>
                                <input 
                                    type="file" 
                                    name="files" 
                                    onChange={(e) => changeImagen(e)} 
                                />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="subir archivo" />
                            </div>
                        </div>
                    </div>

                    <div className="input-field col s12 l4">
                        <button
                            type="button"
                            onClick={() => uploadFile(image)}
                            className="btn waves-effect waves-light red"
                        ><b>Editar</b></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormChangeImage