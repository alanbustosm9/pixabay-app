import { useEffect, useState } from "react";
import { Formulario } from "./components/Formulario";
import { ListadoImagen } from "./components/ListadoImagen";


function App() {

  const [ busqueda, setBusqueda ] = useState('')
  const [ imagenes, setImagenes ] = useState([])
  const [ paginaActual, setPaginaActual ] = useState(1)
  const [ totalPaginas, setTotalPaginas ] = useState(1)

  useEffect(() => {
    
    const consultarApi = async () => {
      if ( busqueda === '' ) return;

      const imagenesPorPagina = 30;
      const key = '23318781-9270aeabfebee54f0b8cbe399'
      const url = `https://pixabay.com/api/?key=${ key }&q=${ busqueda }&per_page=${ imagenesPorPagina }&page=${ paginaActual }`
      const respuesta = await fetch(url);
      const resultado = await respuesta.json()

      setImagenes( resultado.hits )

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina )
      setTotalPaginas( calcularTotalPaginas )

      // Mover pantalla hacia el inicio
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })


    }

    consultarApi()

  }, [ busqueda, paginaActual ])

  // Paginacion

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if ( nuevaPaginaActual === 0 ) return;

    setPaginaActual( nuevaPaginaActual )

  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if( nuevaPaginaActual > totalPaginas ) return;

    setPaginaActual( nuevaPaginaActual )

  }

  return (
    <div className="container">
      <div className="jumbotron">

        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          setBusqueda = { setBusqueda }
          setPaginaActual = { setPaginaActual }
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagen 
          imagenes = { imagenes }
        />

        { ( paginaActual === 1 ) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1 mb-5 mt-5"
            onClick={ paginaAnterior }
          > &laquo; Anterior  
          </button>
        )}

        { ( paginaActual === totalPaginas ) ? null : (
          <button
            type="button"
            className="btn btn-info mb-5 mt-5"
            onClick={ paginaSiguiente }
          > Siguiente &raquo; 
          </button>
        )}
      </div>


    </div>
  );
}

export default App;
