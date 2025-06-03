import LandingPage from './components/LandingPage.jsx'
import ImageContainer from './components/ImageContainer.jsx'
import { useState, useEffect, use } from 'react'
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
import { getItemsFromDynamoDB } from './DynamoDB.jsx'
import GuessHeaders from './components/GuessHeaders.jsx'

// get options from S3 bucket
const fetchOptionsFromS3 = async () => {
  const initOptions = []
  const sourceBucketList = await listSourceBucket();
  sourceBucketList.Contents.forEach((item) => {
    initOptions.push(item.Key.replace('.jpg', ''))
  })
  const items = await getItemsFromDynamoDB(initOptions)
  return { initOptions, items }
}

// daily play
const fetchDaily = async ( initOptions, items ) => {
  const today = new Date();
  const day = today.getDate();
  const todayKey = `daily-result-${today.toISOString().split('T')[0]}`;
  const imageOfTheDay = initOptions[Math.floor(day/31 * initOptions.length)]
  const imageOfTheDayItem = items.find(item => item.memeName === imageOfTheDay)
  const blurredImage = await getFileUrlFromAws(imageOfTheDay + '.jpg', 1800, import.meta.env.VITE_AWS_DESTINATION_NAME)
  const unblurredImage = await getFileUrlFromAws(imageOfTheDay + '.jpg', 1800, import.meta.env.VITE_AWS_SOURCE_NAME)

  return { imageOfTheDay, imageOfTheDayItem, blurredImage, unblurredImage, todayKey }
}

// random play
const fetchRandomImage = async ( initOptions, items ) => {
  const randomImage = initOptions[Math.floor(Math.random() * initOptions.length)]
  const randomImageItem = items.find(item => item.memeName === randomImage)
  const blurredRandomImage = await getFileUrlFromAws(randomImage + '.jpg', 1800, import.meta.env.VITE_AWS_DESTINATION_NAME)
  const unblurredRandomImage = await getFileUrlFromAws(randomImage + '.jpg', 1800, import.meta.env.VITE_AWS_SOURCE_NAME)

  return { randomImage, randomImageItem, blurredRandomImage, unblurredRandomImage }
}

function App() {
  // State variables
  const [options, setOptions] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [todayKey, setTodayKey] = useState(null);
  const [blurredImage, setBlurredImage] = useState(null);
  const [unblurredImage, setUnblurredImage] = useState(null);
  const [imageOfTheDay, setImageOfTheDay] = useState(null);
  const [imageOfTheDayItem, setImageOfTheDayItem] = useState(null);
  const [blurredRandomImage, setBlurredRandomImage] = useState(null);
  const [unblurredRandomImage, setUnblurredRandomImage] = useState(null);
  const [randomImageItem, setRandomImageItem] = useState(null);
  const [randomImage, setRandomImage] = useState(null);
  const [items, setItems] = useState(null);
  //daily play
  const [dailyResult, setDailyResult] = useState(null); 
  const [dailyStart, setDailyStart] = useState(false)
  const [dailyCount, setDailyCount] = useState(0)
  const [dailyGuess, setDailyGuess] = useState([])
  const [dailyGameEnd, setDailyGameEnd] = useState(false)
  //random play
  const [randomStart, setRandomStart] = useState(false)
  const [guess, setGuess] = useState([])
  const [count, setCount] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)
  const [result, setResult] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try { 
        const { initOptions, items } = await fetchOptionsFromS3()
        const { randomImage, randomImageItem, blurredRandomImage, unblurredRandomImage } = await fetchRandomImage( initOptions, items )
        const { imageOfTheDay, imageOfTheDayItem, blurredImage, unblurredImage, todayKey } = await fetchDaily( initOptions, items )
        setTodayKey(todayKey);  
        setOptions(initOptions);
        setImageOfTheDay(imageOfTheDay);
        setBlurredImage(blurredImage);
        setUnblurredImage(unblurredImage);
        setImageOfTheDayItem(imageOfTheDayItem);
        setRandomImage(randomImage);
        setRandomImageItem(randomImageItem);
        setBlurredRandomImage(blurredRandomImage);
        setUnblurredRandomImage(unblurredRandomImage);
        setItems(items);
      } catch (error) { 
        console.error('Error loading data:', error);
      }
    }
    
    loadData();
  }, [refreshKey]); 
  
  //localstorage check for daily game
  useEffect(() => {
    if (todayKey) {
      const storedResult = localStorage.getItem(todayKey);
      try {
        if (storedResult) {
          const parsed = JSON.parse(storedResult);
          if (parsed?.guesses && Array.isArray(parsed.guesses)) {
            setDailyResult(parsed.result);
            setDailyGuess(parsed.guesses);
            setDailyCount(parsed.guesses.length);
            setDailyGameEnd(true);
          } else {
            console.warn("Malformed localStorage data:", parsed);
          }
        }
      } catch (err) {
        console.error("Failed to parse localStorage item:", err);
      }
    }
    
  }, [todayKey]);

  const onChange = (event) => { 
    if (!event) return;
    setGuess(prev => [...prev, event])
    setCount(prev => prev + 1)
    setOptions(options.filter(opt => opt !== event))
    if (event === randomImage) {
      setGameEnd(true)
      setResult(true)
    }
    if (count === 4) {
      setGameEnd(true)
    }
  }

  const onChangeDaily = (event) => { 
    if (!event) return;
    const newGuesses = [...dailyGuess, event];
    setDailyGuess(newGuesses);
    setDailyCount(prev => prev + 1);
    setOptions(options.filter(opt => opt !== event));

    const isCorrect = event === imageOfTheDay;
    const isFinalGuess = dailyCount === 4;

    const resultData = {
      result: isCorrect,
      guesses: newGuesses
    };
    
    if (isCorrect || isFinalGuess) {
      setDailyGameEnd(true);
      setDailyResult(isCorrect);
      if (todayKey) {
        localStorage.setItem(todayKey, JSON.stringify(resultData));
      }
    }
  };
  
  const restartGame = () => {
    setGuess([]);
    setCount(0);
    setGameEnd(false);
    setResult(false);
    setDailyStart(false);
    setRandomStart(true);
    setRefreshKey(refreshKey + 1);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={styles.container} height={"90vh"} >
          <Box sx={styles.container} >
            <Header />
            {!dailyStart && !randomStart && <LandingPage />}
            {!dailyStart && !randomStart && <Button sx={styles.button} variant="contained" onClick={() => setDailyStart(true)}>Daily</Button>}
            {!dailyStart && !randomStart && <Button sx={styles.button} variant="contained" onClick={() => setRandomStart(true)}>Random</Button>}
            {dailyStart && <ImageContainer img={!dailyGameEnd && blurredImage || unblurredImage} />}
            {randomStart && <ImageContainer img={!gameEnd && blurredRandomImage || unblurredRandomImage} />}
          </Box>
          <Box width={"40%"} >
            {dailyStart && dailyGameEnd && <ResultPopup answer={ imageOfTheDay } result={ dailyResult }/>}
            {dailyStart && dailyCount>=1 && <GuessHeaders />}
            {dailyStart && dailyCount>=1 && <Guess guess={items.find(item => item.memeName === dailyGuess[0])} answer={imageOfTheDayItem}/>}
            {dailyStart && dailyCount>=2 && <Guess guess={items.find(item => item.memeName === dailyGuess[1])} answer={imageOfTheDayItem}/>}
            {dailyStart && dailyCount>=3 && <Guess guess={items.find(item => item.memeName === dailyGuess[2])} answer={imageOfTheDayItem}/>}
            {dailyStart && dailyCount>=4 && <Guess guess={items.find(item => item.memeName === dailyGuess[3])} answer={imageOfTheDayItem}/>}
            {dailyStart && dailyCount==5 && <Guess guess={items.find(item => item.memeName === dailyGuess[4])} answer={imageOfTheDayItem}/>}
            {dailyStart && dailyResult && <Confetti />}
            
            {randomStart && gameEnd && <ResultPopup answer={ randomImage } result={ result }/>}
            {randomStart && count>=1 && <GuessHeaders />}
            {randomStart && count>=1 && <Guess guess={items.find(item => item.memeName === guess[0])} answer={randomImageItem}/>}
            {randomStart && count>=2 && <Guess guess={items.find(item => item.memeName === guess[1])} answer={randomImageItem}/>}
            {randomStart && count>=3 && <Guess guess={items.find(item => item.memeName === guess[2])} answer={randomImageItem}/>}
            {randomStart && count>=4 && <Guess guess={items.find(item => item.memeName === guess[3])} answer={randomImageItem}/>}
            {randomStart && count==5 && <Guess guess={items.find(item => item.memeName === guess[4])} answer={randomImageItem}/>}
            {randomStart && result && <Confetti />}
          </Box>
        </Box>
        <Box sx={styles.container}>
          {!dailyGameEnd && dailyStart && <SearchBar options={options} onSelect={onChangeDaily} />}
          {!gameEnd && randomStart && <SearchBar options={options} onSelect={onChange} />}
          {randomStart && gameEnd && <Button sx={styles.button} variant="contained" onClick={() => restartGame()}>Play Again</Button>}
          {dailyStart && dailyGameEnd && <Button sx={styles.button} variant="contained" onClick={() => restartGame()}>Play More</Button>}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
