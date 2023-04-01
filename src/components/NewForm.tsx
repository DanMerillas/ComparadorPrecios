import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";


export default function NewForm(props: { visible: boolean; setParentVisible: any; type: string }) {

    const [openConfirm, setopenConfirm] = useState<boolean>(props.visible)

    const saveFunction = () => {
        console.log('Guardado')
    }

    useEffect(() => {
        if (props.visible) {

            setopenConfirm(true)

        }
    }, [props.visible])


    return (props.type === "Super" ?
        dialogoNuevoSuper()
        : props.type === "Producto" ?
            dialogoNuevoProducto()
            :
            dialogoNuevoPrecio()

    )

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
                            <TextField fullWidth label="Nombre" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Supermercado" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Precio unidad" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Precio" variant="outlined" />
                        </Grid>

                    </Grid>
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setopenConfirm(false);
                        props.setParentVisible(false);
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={saveFunction} color="primary" autoFocus>
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
                            <TextField fullWidth label="Nombre" variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setopenConfirm(false);
                        props.setParentVisible(false);
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={saveFunction} color="primary" autoFocus>
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
                            <TextField fullWidth label="Nombre" variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setopenConfirm(false);
                        props.setParentVisible(false);
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button onClick={saveFunction} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>;
    }
}