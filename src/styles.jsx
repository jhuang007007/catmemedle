import { createTheme } from "@mui/material/styles";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  guess: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#d2af8f',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '.5rem',
    width: '40vw',
    border: '2px solid black',
    borderRadius: '4px',
    boxShadow: 3
  },
  image: {
    maxWidth: '400px',
    width: '60vw',
    borderRadius: '4px',
    boxShadow: 3 
  },
  button: {
    width: '10vw',
    backgroundColor: '#d2af8f',
    color: 'black',
    '&:hover': {
      backgroundColor: '#fff8d6',
    },
  },
  searchbar: {
    width: '80%',
    backgroundColor: '#d2af8f',
    '&:hover': {
      backgroundColor: '#fff8d6',
    },
  },
  resultpopup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff8d6',
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
  },
}

export default styles;