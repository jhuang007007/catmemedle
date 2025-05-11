import LandingPage from './components/landingpage.jsx'
import ImageContainer from './components/ImageContainer.jsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import SearchBar from './components/SearchBar.jsx'
import Header from './components/Header.jsx'
import { Box } from '@mui/material'
import styles from './styles.jsx'
import theme from './theme.jsx'
import Guess from './components/Guess.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const options = ["cat meme", "cat", "meme", "funny cat", "funny meme", "cat video", "cat picture", "cat gif", "cat image", "cat photo", "cat meme generator", "cat meme maker", "cat meme template", "cat meme creator", "cat meme app", "cat meme website", "cat meme search engine"
]

function App() {
  const [dailyStart, setDailyStart] = useState(false)
  const [guess, setGuess] = useState([])
  const [count, setCount] = useState(0)
  const onChange = (event) => { 
    setGuess(guess.concat(event))
    setCount(count + 1)
    options.splice(options.indexOf(event), 1)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={styles.container} height={"90vh"} bgcolor={"peachpuff"}>
          <Box sx={styles.container}>
            <Header />
            {!dailyStart && <LandingPage />}
            {!dailyStart && <Button sx={styles.button} variant="contained" onClick={() => setDailyStart(true)}>Daily</Button>}
            {dailyStart && <ImageContainer />} 
          </Box>
          <Box>
            {count>=1 && <Guess guess={guess[0]} />}
            {count>=2 && <Guess guess={guess[1]} />}
            {count>=3 && <Guess guess={guess[2]} />}
            {count>=4 && <Guess guess={guess[3]} />}
            {count==5 && <Guess guess={guess[4]} />}
          </Box>
        </Box>
        <Box sx={styles.container}>
          {count<=4 && dailyStart && <SearchBar options={options} onSelect={onChange} />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
