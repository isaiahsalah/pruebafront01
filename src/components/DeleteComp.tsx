import { Delete } from '@mui/icons-material';
import { Box, Button, ButtonGroup, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { deleteUser } from '../services/User.api';

interface DeleteCompProps {
    updateList: () => void;
    idData: number;

}

const DeleteComp: React.FC<DeleteCompProps> = ({ updateList, idData }) => {

    const [open, setOpen] = useState(false);
    const [cargando, setCargando] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        updateList()
    }, [open])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleEliminar = async () => {
        if (idData != 0) {
            setCargando(true)

            const reponse = await deleteUser(idData);

            if (Number(reponse) >= 200 && Number(reponse) < 300) {
                setCargando(false)
                enqueueSnackbar("Eliminado con exito", {
                    variant: "success",
                });
                handleClose()
            }
            else {
                setCargando(false)

                enqueueSnackbar("No se pudo eliminar los datos", {
                    variant: "error",
                });
            }
        }
        else {
            enqueueSnackbar("Id de usuario invalido", {
                variant: "warning",
            });
        }


    }
    return (
        <React.Fragment>
            <IconButton aria-label="edit" color="secondary" size='small' onClick={handleClickOpen}>
                <Delete />
            </IconButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ padding: 4, paddingBottom: 0 }}>{"Eliminar usuario"}</DialogTitle>
                <DialogContent >
                    <Grid2 container spacing={2} p={2} paddingBottom={0}>
                        <Typography  >
                            ¿Estás seguro de eliminar este usuario?
                        </Typography>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup sx={{ padding: 4, paddingTop: 0 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant='contained' onClick={handleEliminar}>Eliminar</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            {cargando && (
                <Box sx={{ height: "100vh", width: "100vw", top: 0, left: 0, alignContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.25)', position: "fixed", zIndex: "1301" }} >
                    <CircularProgress sx={{ color: "white" }} />
                </Box>
            )}
        </React.Fragment>
    )
}

export default DeleteComp