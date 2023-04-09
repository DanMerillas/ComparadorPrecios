import React, { useEffect, useState } from 'react';
import './App.css';
import { NewButtons } from './components/NewButtons';
import { ReactTable } from './components/ReactTable';
import { borrarDato, obtenerDatos } from './services/db';
import { PacmanLoader } from 'react-spinners';
import NewForm from './components/NewForm';

function App() {

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showNewForm, setShowNewForm] = useState<boolean>(false)
  const [currentRow, setCurrentRow] = useState<any>({})

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

  const editarPrecio = (row:any)=>{
    setShowNewForm(true)
    setCurrentRow(row)
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
        {!loading ? <ReactTable data={data} eventoBorrar={borrarDatos} eventoEditar={editarPrecio} /> : <PacmanLoader color="#36d7b7" />}
        <NewForm visible={showNewForm} setParentVisible={setShowNewForm} type={'PrecioEditar'} updateTableEvent={obtenerDatosTabla} currentRow={currentRow}/>
      </section>
    </div>
  );
}

export default App;
