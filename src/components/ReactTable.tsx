import DataTable from 'react-data-table-component';
import { HiPencil, HiOutlineTrash } from "react-icons/hi";




export function ReactTable(props:{data:any; eventoBorrar:any}) {

    const columns = [
    {
      cell: (row: any) => <><HiPencil className='accion' size={'42px'} title="Editar precio" onClick={()=>{
        console.log(row)
      }}/><HiOutlineTrash className='accion' size={'42px'} title="Editar precio" onClick={()=>{
        props.eventoBorrar(row.id)
      }}/></>,
       allowOverflow: true,
       button: true,
       width: '50px',
      },
    {
        name: 'Producto',
        selector: (row: any) => row.PRODUCT_NAME,
        sortable: true,
    },
    
    {
        name: 'supermarket',
        selector: (row:any) => row.SUPERMERCADO,
        sortable: true,
    },
    {
        name: 'Precio Unidad',
        selector: (row:any) => row.PRECIO_UNIDAD,
        sortable: true,
    },
    {
        name: 'Precio',
        selector: (row:any) => row.PRECIO,
        sortable: true,
    },
    {
        name: 'Cantidad',
        selector: (row:any) => row.CANTIDAD,
        sortable: true,
    }
    
];

    return (<DataTable className='tablaReact' columns={columns} data={props.data} pagination  />)

}