import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { guardarDatos, obtenerDatos } from "../services/db";


export default function NewForm(props: { visible: boolean; setParentVisible: any; type: string; updateTableEvent:any }) {

    const [openConfirm, setopenConfirm] = useState<boolean>(props.visible)
    const [superMercados, setSuperMercados] = useState<any>([])
    const [producto, setProducto] = useState<any>([])
    const [productoValue, setProductoValue] = useState<string>('')
    const [superValue, setSuperValue] = useState<string>('')
    const [precio, setPrecio] = useState<number>(0)
    const [precioUnidad, setPrecioUnidad] = useState<number>(0)
    const [cantidad, setCantidad] = useState<string>('')


    const guardarProducto = async () => {

        if (producto.filter((x: string) => x === productoValue).length > 0) {
            alert("El producto ya existe")
        }
        else {
            const result = await guardarDatos("Productos", [{ NOMBRE: productoValue }])

            if (result) {
                alert("Producto guardado correctamente")
                setProductoValue('')
                accionesCerrarDialog()
            }
            else {
                alert("Se produjo un error")
            }
        }
    }

    const guardarSuper = async () => {

        if (superMercados.filter((x: string) => x === superValue).length > 0) {
            alert("El supermercado ya existe")
        }
        else {
            const result = await guardarDatos("SuperMercados", [{ NOMBRE: superValue }])

            if (result) {
                alert("Supermercado guardado correctamente")
                setSuperValue('')
                accionesCerrarDialog()
            }
            else {
                alert("Se produjo un error")
            }
        }
    }


    const guardarPrecio = async () => {

        if (productoValue !== "" && superValue !== "") {
            const datos = [{ PRODUCT_NAME: productoValue, SUPERMERCADO: superValue, PRECIO_UNIDAD: precioUnidad, PRECIO: precio, CANTIDAD: cantidad }]
            const result = await guardarDatos("PreciosSuperMercados", datos)

            if (result) {
                alert("Precio guardado correctamente")
                setSuperValue('')
                setProductoValue('')
                setCantidad('')
                setPrecio(0)
                setPrecioUnidad(0)
                props.updateTableEvent()
                accionesCerrarDialog()
                
            }
            else {
                alert("Se produjo un error")
            }
        }
        else {
            alert("Faltan campos obligatorios")
        }

    }

    useEffect(() => {

        obtenerValoresCombos();

        if (props.visible) {
            setopenConfirm(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible])



    return (props.type === "Super" ?
        dialogoNuevoSuper()
        : props.type === "Producto" ?
            dialogoNuevoProducto()
            :
            dialogoNuevoPrecio()

    )

    function obtenerValoresCombos() {

        if (props.type === "Precio") {
            obtenerDatos("SuperMercados", "NOMBRE", "NOMBRE").then((values: any) => {
                const options = values ? values.data.map((value: any) => value.NOMBRE) : [];
                setSuperMercados(options);
            });

            obtenerDatos("Productos", "NOMBRE", "NOMBRE").then((values: any) => {
                const options = values ? values.data.map((value: any) => value.NOMBRE) : [];
                setProducto(options);
            });
        }

    }

    function accionesCerrarDialog() {
        setopenConfirm(false);
        props.setParentVisible(false);
    }

    function dialogoNuevoPrecio() {
        return <Dialog
            className="newFormDialog"
            open={openConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Nuevo Precio
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid className="gridReact" container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Autocomplete disablePortal options={producto} renderInput={(params: any) => <TextField {...params} label="Producto" />} onChange={(event: any, values: any) => { setProductoValue(values) }} value={productoValue} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Autocomplete disablePortal options={superMercados} renderInput={(params: any) => <TextField {...params} label="Supermercado" />} onChange={(event: any, values: any) => { setSuperValue(values) }} value={superValue} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Precio unidad" variant="outlined" type="number" value={precioUnidad !== 0 && precioUnidad} onChange={(v: any) => setPrecioUnidad(v.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Precio" variant="outlined" type="number" value={precio !== 0 && precio} onChange={(v: any) => setPrecio(v.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Cantidad (indicar gr/ml)" variant="outlined" type="text" value={cantidad} onChange={(v: any) => setCantidad(v.target.value)} />
                        </Grid>
                    </Grid>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        accionesCerrarDialog()

                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={guardarPrecio} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>;
    }

    function dialogoNuevoProducto() {
        return <Dialog
            className="newFormDialog"
            open={openConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Nuevo Producto
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid className="gridReact" container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Nombre" variant="outlined" value={productoValue} onChange={(v) => setProductoValue(v.target.value)} />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        accionesCerrarDialog()
                        setProductoValue('')
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={guardarProducto} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>;
    }

    function dialogoNuevoSuper() {
        return <Dialog
            className="newFormDialog"
            open={openConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                Nuevo Supermercado
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid className="gridReact" container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Nombre" variant="outlined" value={superValue} onChange={(v) => setSuperValue(v.target.value)} />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setProductoValue('')
                        accionesCerrarDialog()
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={guardarSuper} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>;
    }
}