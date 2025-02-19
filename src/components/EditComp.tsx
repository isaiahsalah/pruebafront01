import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { UserExample } from '../constants/userExpample';
import { Autocomplete, Box, Button, ButtonGroup, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { UserInterface } from '../interfaces/userInterface';
import { editUser, getUser } from '../services/User.api';
import { DatePicker } from '@mui/x-date-pickers';
import { NationalityConst } from '../constants/nationalityConst';
import dayjs from 'dayjs';
interface EditCompProps {
    updateList: () => void;
    idData: number;
}

const EditComp: React.FC<EditCompProps> = ({ updateList, idData }) => {

    const [open, setOpen] = useState(false);
    const [cargando, setCargando] = useState(false);

    const [data, setData] = useState<UserInterface>(UserExample);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        updateData()
        updateList()
    }, [open])

    const updateData = async () => {
        setCargando(true);
        setData(await getUser(idData))
        await setCargando(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setData(UserExample)
        setOpen(false);
    };
    const esEmailValido = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleEditar = async () => {
        if (data.name != "" && esEmailValido(data.email) && data.nationality != "" && data.phone != "" && data.profession != "" && data.salary != 0) {
            setCargando(true)

            const reponse = await editUser(data);

            if (Number(reponse) >= 200 && Number(reponse) < 300) {
                setCargando(false)
                enqueueSnackbar("Editado con exito", {
                    variant: "success",
                });
                handleClose()
            }
            else {
                setCargando(false)

                enqueueSnackbar("No se pudo editar los datos", {
                    variant: "error",
                });
            }
        }
        else {
            enqueueSnackbar("Rellena los datos corréctamente", {
                variant: "warning",
            });
        }


    }
    return (
        <React.Fragment>
            <IconButton aria-label="edit" color="primary" size='small' onClick={handleClickOpen}>
                <Edit />
            </IconButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ padding: 4, paddingBottom: 0 }}>{"Editar usuario"}</DialogTitle>
                <DialogContent >
                    <Grid2 container spacing={2} p={2} paddingBottom={0}>
                        <Grid2 size={{ xs: 12 }}   >
                            <TextField
                                fullWidth
                                label="Nombre"
                                value={data.name}
                                onChange={(event) => {
                                    const newData: UserInterface = { ...data, name: event.target.value };
                                    setData(newData)
                                }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}  >
                            <DatePicker
                                sx={{ width: 1 }}
                                label="Fecha de Nacimiento"
                                format="DD-MM-YYYY"
                                value={dayjs(data.birthDate)}

                                onChange={(date) => {
                                    if (date) {
                                        const newData: UserInterface = { ...data, birthDate: date.toDate() };
                                        setData(newData)
                                        //console.log(newData)
                                    }
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}    >
                            <TextField
                                fullWidth
                                label="Profesión"
                                value={data.profession}
                                onChange={(event) => {
                                    const newData: UserInterface = { ...data, profession: event.target.value };
                                    setData(newData)
                                }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Autocomplete
                                renderOption={(props, option: string) => {
                                    return (
                                        <li {...props} key={option}>
                                            {option}
                                        </li>
                                    );
                                }}
                                disablePortal
                                options={NationalityConst}
                                getOptionLabel={(option: string) => {
                                    return option ? option : ""
                                }}
                                onChange={(_event, newValue: string | null) => {
                                    const newData: UserInterface = { ...data, nationality: newValue ? newValue : "" };
                                    setData(newData)
                                }}
                                renderInput={(params) => <TextField {...params} label="Nacionalidad" />}
                                value={data.nationality}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }} >
                            <TextField
                                fullWidth
                                label="Telefono"
                                type="number"

                                value={Number(data.phone)}
                                onChange={(event) => {
                                    const newData: UserInterface = { ...data, phone: event.target.value };
                                    setData(newData)
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}    >
                            <TextField
                                fullWidth
                                label="Email"
                                type='email'
                                value={data.email}
                                onChange={(event) => {
                                    const newData: UserInterface = { ...data, email: event.target.value };
                                    setData(newData)
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}    >
                            <TextField
                                fullWidth
                                label="Salario"
                                type="number"
                                value={data.salary}
                                onChange={(event) => {
                                    const newData: UserInterface = { ...data, salary: Number(event.target.value) };
                                    setData(newData)
                                }}
                            />
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup sx={{ padding: 4, paddingTop: 0 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant='contained' onClick={handleEditar}>Editar</Button>
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

export default EditComp