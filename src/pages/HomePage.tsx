import { Box, CircularProgress, Divider, Grid2, IconButton, Typography, useTheme } from '@mui/material'
import { GitHub } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import AddComp from '../components/AddComp';
import EditComp from '../components/EditComp';
import DeleteComp from '../components/DeleteComp';
import { getUsers } from '../services/User.api';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { UserInterface } from '../interfaces/userInterface';


const HomePage = () => {
    const [list, setList] = useState<UserInterface[]>([]);

    const [cargando, setCargando] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        updateList()
    }, [])

    const updateList = async () => {
        setCargando(true)
        setList(await getUsers())
        setCargando(false)
    }

    const handleClickOpenFrontGit = () => {
        // Redirigir a una URL externa y abrirla en una nueva pestaña
        window.open('https://github.com/isaiahsalah/pruebafront01', '_blank');
    };
    const handleClickOpenBackGit = () => {
        // Redirigir a una URL externa y abrirla en una nueva pestaña
        window.open('https://github.com/isaiahsalah/pruebaback01', '_blank');
    };


    const columns: GridColDef[] = [
        {
            field: 'num', headerName: '#',
            renderCell: (params) => {
                // Usa `params.api.getRowIndexRelativeToVisibleRows` para obtener el índice
                const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.id);
                return <span>{rowIndex + 1}</span>;
            },
        },
        { field: 'id', headerName: 'Id' },
        { field: 'name', headerName: 'Nombre' },
        {
            field: 'birthDate', headerName: 'Nacimiento', type: 'date',
            valueGetter: (value) => {
                const date = new Date(value);
                return date;
            }
        },
        { field: 'profession', headerName: 'Profesión' },
        { field: 'nationality', headerName: 'Nacionalidad' },
        { field: 'phone', headerName: 'Telefono' },
        { field: 'email', headerName: 'Email' },
        { field: 'salary', headerName: 'Salario', },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 150,
            renderCell: (params: GridRenderCellParams<UserInterface>) => (
                <Grid2 container spacing={1} justifyContent={'center'} >
                    <Grid2 >
                        <EditComp updateList={updateList} idData={params.row.id ? params.row.id : 0} />
                    </Grid2>
                    <Grid2 >
                        <DeleteComp updateList={updateList} idData={params.row.id ? params.row.id : 0} />
                    </Grid2>
                </Grid2>
            ),
        },

    ];


    return (
        <Grid2>
            <Grid2 p={2}>
                <Typography fontWeight={"bold"} fontFamily={"monospace"} lineHeight={1} fontSize={{ xs: 40, sm: 60, md: 90 }}>
                    Prueba Técnica
                </Typography>

                <Grid2 container p={0.5} spacing={1} justifyContent={'center'}>
                    <Grid2 container alignItems={'center'}>
                        <IconButton aria-label="backend" color="primary" size='small' onClick={handleClickOpenBackGit}  >
                            <GitHub />
                        </IconButton>
                        <Typography color='textSecondary' fontSize={{ xs: 12, sm: 13, md: 14 }} >
                            backend
                        </Typography>
                    </Grid2>


                    <Grid2>
                        <Divider orientation='vertical' />

                    </Grid2>
                    <Grid2 container alignItems={'center'}>
                        <IconButton aria-label="frontend" color="primary" size='small' onClick={handleClickOpenFrontGit}  >
                            <GitHub />
                        </IconButton>
                        <Typography color='textSecondary' fontSize={{ xs: 12, sm: 13, md: 14 }} >
                            Frontend
                        </Typography>
                    </Grid2>
                </Grid2>


            </Grid2>




            <AddComp updateList={updateList} />



            <Box
                sx={{
                    width: {
                        xs: "calc(100vw - 4rem)",
                        sm: "calc(100vw - 4rem)",
                        md: "calc(100vw - 4rem)",
                    },
                    maxWidth: "calc(1280px - 4rem)"
                }}
            >
                <DataGrid
                    //className="datagrid-content"
                    rows={list}
                    columns={columns}
                    hideFooterPagination
                    rowHeight={55}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: GridToolbar,

                    }}
                    //onRowClick={posteSelect}
                    hideFooter
                //slotProps={{ toolbar: { showQuickFilter: true } }}

                />
            </Box>

            <Grid2
                sx={{
                    backgroundColor: theme.palette.background.default,
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    textAlign: "center",
                }}
            >
                <Divider />
                <Typography fontFamily={"monospace"} color='textSecondary' p={1} fontSize={{ xs: 11, sm: 12, md: 14 }}>
                    @isaiahsalah
                </Typography>
            </Grid2>

            {cargando && (
                <Box sx={{ height: "100vh", width: "100vw", top: 0, left: 0, alignContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.25)', position: "fixed", zIndex: "1301" }} >
                    <CircularProgress sx={{ color: "white" }} />
                </Box>
            )}
        </Grid2>
    )
}

export default HomePage