const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: "Delius",
    textShadow: '0px 0px 1px white',
    color: '#322B25',
    '&@media (max-width: 300px)': {
      fontSize: '0.5rem',
    }
  },
  guess: {
    textAlign: 'center',
    marginBottom: '2px',
    fontSize: '1rem',
  },
  guessHeaders: { 
    color: '#322B25',
    marginBottom: '10px',
    marginTop: '10px',
  },
  guessHeadersItem: {
    border: '1px solid black',
    textShadow: '0px 0px 3px white',
    textAlign: 'center',
    boxShadow: "inset 0 0 4px rgba(0,0,0,.4)",
    backgroundColor: '#d2af8f',
    alignContent: 'center',
  },
  guessCorrect: {
    backgroundColor: '#7BB662',
    border: '3px solid #99c785',
    borderRadius: '1px',
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
    backgroundColor: '#CCA800',
    border: '3px solid #E5BD00',
    borderRadius: '1px',
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
    backgroundColor: '#d2af8f',
    '&:hover': {
      backgroundColor: '#fff8d6',
    },
    fontFamily: "Delius",
    textShadow: '0px 0px 3px white',
    color: '#322B25',
    marginTop: 2,
  },
  searchbar: {
    width: '80%',
    backgroundColor: 'rgba(82, 69, 56, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(100, 97, 84, 0.5)',
    },
    zIndex: 10,
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
    textShadow: '0px 0px 3px white',
    color: '#322B25',
  },
  downIcon: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
    transform: "rotate(90deg)",
    fontSize: '5rem',
    top: '-15%',
    left: '0%',
    width: '100%',
    zIndex: 1,
  },  
  upIcon: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
    transform: "rotate(-90deg)",
    fontSize: '5rem',
    top: '-20%',
    left: '0%',
    width: '100%',
    zIndex: 1,
  }
}

export default styles;