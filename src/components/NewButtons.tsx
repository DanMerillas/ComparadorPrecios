import { Grid } from "@mui/material";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import NewForm from "./NewForm";


export function NewButtons(props:{updateTableEvent:any}) {

const [showNewForm, setShowNewForm] = useState<boolean>(false)
const [newFormType, setNewFormType] = useState<string>('')

const handlerClick = (type:string)=>{
    setNewFormType(type)
    setShowNewForm(true)
}


    return (
        <>
        <Grid className="gridReact" container spacing={2}>
            <Grid item xs={4} md={4}>
                <button type="button" className="newButton" title="Añadir supermercado" onClick={()=>handlerClick("Super")}><HiPencilAlt/> Super</button>
            </Grid>
            <Grid item xs={4} md={4}>
                <button type="button" className="newButton" title="Añadir producto" onClick={()=>handlerClick("Producto")}><HiPencilAlt/> Producto</button>
            </Grid>
            <Grid item xs={4} md={4}>
                <button type="button" className="newButton" title="Añadir precio" onClick={()=>handlerClick("Precio")}><HiPencilAlt/> Precio</button>
            </Grid>

        </Grid>

        <NewForm visible={showNewForm} setParentVisible={setShowNewForm} type={newFormType} updateTableEvent={props.updateTableEvent}/>
        </>
    )

}