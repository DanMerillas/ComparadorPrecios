import { TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { HiOutlineTrash } from "react-icons/hi";




export function ReactTable(props: { data: any; eventoBorrar: any }) {
    const [filterText1, setFilterText] = useState('');

    const [filteredItems, setFilteredItems] = useState(props.data);



    

    const columns = [
        {
            cell: (row: any) => <><HiOutlineTrash className='accion' size={'25px'} title="Editar precio" onClick={() => {
                props.eventoBorrar(row.id)
            }} /></>,
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
            selector: (row: any) => row.SUPERMERCADO,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: (row: any) => row.PRECIO,
            sortable: true,
        },
        {
            name: 'Precio Unidad',
            selector: (row: any) => row.PRECIO_UNIDAD,
            sortable: true,
        },
        
        {
            name: 'Cantidad',
            selector: (row: any) => row.CANTIDAD,
            sortable: true,
        }

    ];

    useEffect(() => {

        if (filterText1 && filterText1 !== "") {
            const filter = props.data.filter(
                (item: any) => {
                    return (item.PRODUCT_NAME || item.SUPERMERCADO) && (
                        item.PRODUCT_NAME.toLowerCase().includes(filterText1.toLowerCase()) ||
                        item.SUPERMERCADO.toLowerCase().includes(filterText1.toLowerCase())
                    )
                })
            
            setFilteredItems(filter)
        }
        else {
            setFilteredItems(props.data)
        }


    }, [filterText1, props.data])


    return (
        <>
            <TextField
                className="search"
                type="text"
                placeholder="Buscar producto"
                aria-label="Search Input"
                value={filterText1}
                onChange={(e: any) => setFilterText(e.target.value)}
            />
            <DataTable className='tablaReact' columns={columns} data={filteredItems} pagination />
        </>
    )

}