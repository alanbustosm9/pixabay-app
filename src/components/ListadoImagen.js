import React from 'react'
import PropTypes from 'prop-types';
import { Imagen } from './Imagen'

export const ListadoImagen = ({ imagenes }) => {
    return (
        <div className="col-12 p5 row">
            { imagenes.map( imagen => (
                <Imagen
                    key={ imagen.id }
                    imagen={ imagen }
                />
            )) }
            
        </div>
    )
}

ListadoImagen.propTypes = {
    imagenes: PropTypes.array.isRequired
}
