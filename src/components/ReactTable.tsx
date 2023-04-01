import DataTable from 'react-data-table-component';
import { HiPencil } from "react-icons/hi";

const columns = [
    {
      cell: (row: any) => <HiPencil className='Editar' title="Editar precio" onClick={()=>{
        console.log(row)
      }}/>,
       allowOverflow: true,
       button: true,
       width: '20px',
      },
    {
        name: 'Title',
        selector: (row: any) => row.title,
        sortable: true,
    },
    
    {
        name: 'supermarket',
        selector: (row:any) => row.supermarket,
        sortable: true,
    },
    {
        name: 'price_unit',
        selector: (row:any) => row.price_unit,
        sortable: true,
    },
    {
        name: 'price',
        selector: (row:any) => row.price,
        sortable: true,
    },
    
];



const data = [
    {
        id: 1,
        title: 'Producto1',
        price_unit: 123,
        price: 123,
        supermarket: 'Carrefour'
    },
    {
        id: 2,
        title: 'Producto1',
        price_unit: 123,
        price: 123,
        supermarket: 'AhorraMas'
    },
    {
        id: 3,
        title: 'Producto1',
        price_unit: 123,
        price: 123,
        supermarket: 'Mercadona'
    },
    {
        id: 4,
        title: 'Producto2',
        price_unit: 123,
        price: 123,
        supermarket: 'Carrefour'
    },
    {
        id: 5,
        title: 'Producto3',
        price_unit: 123,
        price: 123,
        supermarket: 'Carrefour'
    },
    
]



export function ReactTable() {

    return (<DataTable className='tablaReact' columns={columns} data={data} pagination  />)

}