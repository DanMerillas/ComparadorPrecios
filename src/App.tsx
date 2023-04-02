import React, { useEffect, useState } from 'react';
import './App.css';
import { NewButtons } from './components/NewButtons';
import { ReactTable } from './components/ReactTable';
import { borrarDato, obtenerDatos } from './services/db';

function App() {

  const [data, setData] = useState<any>([])

  const obtenerDatosTabla = () => {
    obtenerDatos("PreciosSuperMercados", "PRODUCT_NAME,SUPERMERCADO,PRECIO,PRECIO_UNIDAD,CANTIDAD,id", "PRODUCT_NAME").then((results) => {
      const values = results ? results.data : [];
      setData(values)
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
      <section>
        <ReactTable data={data} eventoBorrar={borrarDatos} />
      </section>
    </div>
  );
}

export default App;
