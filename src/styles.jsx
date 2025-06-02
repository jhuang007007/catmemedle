const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  guess: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '75px',
    marginBottom: '10px',
  },
  guessChild: {
    border: '1px solid black',
    borderRadius: '4px',
    padding: 1,
  },
  guessHeaders: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    textShadow: '0px 0px 3px white',
    color: 'black',
    marginBottom: '10px',
    marginTop: '10px',
    borderBottom: '2px solid black',
  },
  guessCorrect: {
    backgroundColor: '#7BB662',
    border: '3px solid #99c785',
    borderRadius: '1px',
    padding: 1,
    color: 'white',
    textShadow: '0px 0px 3px black',
    boxShadow: "inset 0 0 4px rgba(0,0,0,.4)",
    alignContent: 'center',
    '&:hover': {
      backgroundColor: '#8ccf6c',
      border: '3px solid #b2e0a1',
    }
  },
  guessIncorrect: {
    backgroundColor: '#E03C32',
    border: '3px solid #e86a64',
    borderRadius: '1px',
    padding: 1,
    color: 'white',
    textShadow: '0px 0px 3px black',
    boxShadow: "inset 0 0 4px rgba(0,0,0,.4)",
    alignContent: 'center',
    '&:hover': {
      backgroundColor: '#f05a54',
      border: '3px solid #f28c8a',
    }
  },
  guessPartiallyCorrect: {
    backgroundColor: '#FFD301',
    border: '3px solid #ffe666',
    borderRadius: '1px',
    padding: 1,
    color: 'white',
    textShadow: '0px 0px 3px black',
    boxShadow: "inset 0 0 4px rgba(0,0,0,.4)",
    alignContent: 'center',
    '&:hover': {
      backgroundColor: '#ffe000',
      border: '3px solid #fff2b3',
    }
  },
  image: {
    objectFit: 'contain',
    maxWidth: '400px',
    maxHeight: '30vh',
    width: 'auto',
    border: '2px solid black',
    borderRadius: '4px',
    boxShadow: 3,
    backgroundColor: 'black',
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
    textAlign: 'center',
    border: '2px solid black',
    backgroundColor: '#fff8d6',
    padding: 0,
    marginTop: 2,
    borderRadius: 2,
    boxShadow: 3,
  },
  header: {
    fontFamily: "Delius",
    textShadow: '0px 0px 3px black',
    color: 'white',
  },
  downIcon: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
    transform: "rotate(90deg)",
    fontSize: '5rem',
    top: '-7%',
    left: '0%',
    width: '100%',
    zIndex: 1,
  },
  upIcon: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
    transform: "rotate(-90deg)",
    fontSize: '5rem',
    top: '-7%',
    left: '0%',
    width: '100%',
    zIndex: 1,
  }
}

export default styles;