import React, { useState } from 'react'
import { Error } from './Error'
import PropTypes from 'prop-types';

export const Formulario = ({ setBusqueda, setPaginaActual }) => {


    const [ imagen, setImagen ] = useState('')    
    const [ error, setError ] = useState(false)


    const buscarImagenes = ( e ) => {
        e.preventDefault()

        // Validar
        if ( imagen.trim() === '' ) {
            setError( true )
            return
        }

        setError( false )

        // Enviar la busqueda
        setBusqueda( imagen )

        // Reiniciar paginaActual
        setPaginaActual(1)
    }



    return (
        <form
            onSubmit={ buscarImagenes }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imágen"
                        onChange={ e => setImagen( e.target.value ) }
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>



            </div>

            { error ? <Error mensaje="Agrega un término de búsqueda" /> : null }
            
        </form>
    )
}

Formulario.propTypes = {
    setBusqueda: PropTypes.func.isRequired,
    setPaginaActual: PropTypes.func.isRequired
}
