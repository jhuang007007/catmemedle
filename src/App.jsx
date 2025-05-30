import LandingPage from './components/LandingPage.jsx'
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
import ResultPopup from './components/ResultPopup.jsx'
import { listSourceBucket, getFileUrlFromAws } from './S3.jsx'
import Confetti from 'react-confetti-boom';

// get options from S3 bucket
const options = []
const sourceBucketList = await listSourceBucket();
sourceBucketList.Contents.forEach((item) => {
  options.push(item.Key.replace('.jpg', ''))
})

// get image of the day 
const imageOfTheDay = options[Math.floor(Math.random() * options.length)]
console.log("Image of the day:", imageOfTheDay)
const blurredImage = await getFileUrlFromAws(imageOfTheDay + '.jpg', 1800, import.meta.env.VITE_AWS_DESTINATION_NAME)
const unblurredImage = await getFileUrlFromAws(imageOfTheDay + '.jpg', 1800, import.meta.env.VITE_AWS_SOURCE_NAME)

function App() {
  const [dailyStart, setDailyStart] = useState(false)
  const [guess, setGuess] = useState([])
  const [count, setCount] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)
  const [result, setResult] = useState(false)
  const onChange = (event) => { 
    setGuess(guess.concat(event))
    setCount(count + 1)
    options.splice(options.indexOf(event), 1)
    if (event === imageOfTheDay) {
      setGameEnd(true)
      setResult(true)
    }
    if (count === 5) {
      setGameEnd(true)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={styles.container} height={"90vh"} >
          <Box sx={styles.container}>
            <Header />
            {!dailyStart && <LandingPage />}
            {!dailyStart && <Button sx={styles.button} variant="contained" onClick={() => setDailyStart(true)}>Daily</Button>}
            {dailyStart && <ImageContainer img={!gameEnd && blurredImage || unblurredImage} />} 
          </Box>
          <Box>
            {count>=1 && <Guess guess={guess[0]} result={guess[0] === imageOfTheDay}/>}
            {count>=2 && <Guess guess={guess[1]} result={guess[1] === imageOfTheDay}/>}
            {count>=3 && <Guess guess={guess[2]} result={guess[2] === imageOfTheDay}/>}
            {count>=4 && <Guess guess={guess[3]} result={guess[3] === imageOfTheDay}/>}
            {count==5 && <Guess guess={guess[4]} result={guess[4] === imageOfTheDay}/>}
            {gameEnd && <ResultPopup answer={ imageOfTheDay } result={ result }/>}
            {result && <Confetti />}
          </Box>
        </Box>
        <Box sx={styles.container}>
          {!gameEnd && dailyStart && <SearchBar options={options} onSelect={onChange} />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
