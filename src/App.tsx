
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import './App.css'
import HomePage from './pages/HomePage'
import { SnackbarProvider } from 'notistack'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

function App() {


  const darkTheme = createTheme(
    {
      palette: {
        mode: "dark"
      },
    })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={2}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <HomePage />
        </ThemeProvider>
      </SnackbarProvider>
    </LocalizationProvider>

  )
}

export default App
