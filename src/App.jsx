import LandingPage from './components/LandingPage.jsx'
import ImageContainer from './components/ImageContainer.jsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import SearchBar from './components/SearchBar.jsx'
import Header from './components/Header.jsx'
import { Box, Grid } from '@mui/material'
import styles from './styles.jsx'
import theme from './theme.jsx'
import Guess from './components/Guess.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import ResultPopup from './components/ResultPopup.jsx'
import { listSourceBucket, getFileUrlFromAws } from './S3.jsx'
import Confetti from 'react-confetti-boom';
import { getItemsFromDynamoDB } from './DynamoDB.jsx'
import GuessHeaders from './components/GuessHeaders.jsx'

// get options from S3 bucket
const options = []
const sourceBucketList = await listSourceBucket();
sourceBucketList.Contents.forEach((item) => {
  options.push(item.Key.replace('.jpg', ''))
})
const items = await getItemsFromDynamoDB(options)

// get image of the day 
const imageOfTheDay = options[Math.floor(Math.random() * options.length)]
const imageOfTheDayItem = items.find(item => item.memeName === imageOfTheDay)
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
    if (count === 4) {
      setGameEnd(true)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={styles.container} height={"90vh"} >
          <Box sx={styles.container} >
            <Header />
            {!dailyStart && <LandingPage />}
            {!dailyStart && <Button sx={styles.button} variant="contained" onClick={() => setDailyStart(true)}>Daily</Button>}
            {dailyStart && <ImageContainer img={!gameEnd && blurredImage || unblurredImage} />} 
          </Box>
          <Box width={"40%"} >
            {gameEnd && <ResultPopup answer={ imageOfTheDay } result={ result }/>}
            {count>=1 && <GuessHeaders />}
            {count>=1 && <Guess guess={items.find(item => item.memeName === guess[0])} answer={imageOfTheDayItem}/>}
            {count>=2 && <Guess guess={items.find(item => item.memeName === guess[1])} answer={imageOfTheDayItem}/>}
            {count>=3 && <Guess guess={items.find(item => item.memeName === guess[2])} answer={imageOfTheDayItem}/>}
            {count>=4 && <Guess guess={items.find(item => item.memeName === guess[3])} answer={imageOfTheDayItem}/>}
            {count==5 && <Guess guess={items.find(item => item.memeName === guess[4])} answer={imageOfTheDayItem}/>}
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
