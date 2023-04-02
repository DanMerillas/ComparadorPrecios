import React, { useEffect, useState } from 'react';
import './App.css';
import { NewButtons } from './components/NewButtons';
import { ReactTable } from './components/ReactTable';
import { borrarDato, obtenerDatos } from './services/db';
import { PacmanLoader } from 'react-spinners';

function App() {

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  const obtenerDatosTabla = () => {
    setLoading(true)
    obtenerDatos("PreciosSuperMercados", "PRODUCT_NAME,SUPERMERCADO,PRECIO,PRECIO_UNIDAD,CANTIDAD,id", "PRODUCT_NAME").then((results) => {
      const values = results ? results.data : [];
      setData(values)
      setLoading(false)
    })
  }

  const borrarDatos = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm("Estas seguro que quieres borrar el elemento")

    if (conf) {
      const result = await borrarDato("PreciosSuperMercados", id)

      if (result) {
        obtenerDatosTabla()
      }
      else {
        alert("Error al eliminar")
      }
    }

  }

  useEffect(() => {
    obtenerDatosTabla()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <NewButtons updateTableEvent={obtenerDatosTabla} />
      </header>
      <section className={loading ? 'loadingSection' : ''}>
        {!loading ? <ReactTable data={data} eventoBorrar={borrarDatos} /> : <PacmanLoader color="#36d7b7" />}
      </section>
    </div>
  );
}

export default App;
