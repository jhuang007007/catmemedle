import LandingPage from './components/LandingPage.jsx'
import ImageContainer from './components/ImageContainer.jsx'
import { useState, useEffect } from 'react'
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
import Confetti from 'react-confetti-boom';
import GuessHeaders from './components/GuessHeaders.jsx'

const API_BASE = import.meta.env.VITE_API_BASE

const fetchOptions = async () => {
  const res = await fetch(`${API_BASE}/options`);
  const data = await res.json();  
  return data; // { initOptions, items }
};

const fetchDaily = async () => {
  const res = await fetch(`${API_BASE}/daily`);
  const data = await res.json();
  return data; // { imageOfTheDay, imageOfTheDayItem, blurredImage, unblurredImage, todayKey }
};

const fetchRandom = async () => {
  const res = await fetch(`${API_BASE}/random`);
  const data = await res.json();
  return data; // { randomImage, randomImageItem, blurredRandomImage, unblurredRandomImage }
};

function App() {
  const [options, setOptions] = useState(null);
  const [initOptions, setInitOptions] = useState(null);
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
  // Daily play
  const [dailyStart, setDailyStart] = useState(false)
  const [dailyGuess, setDailyGuess] = useState([])
  const [dailyCount, setDailyCount] = useState(0)
  const [dailyGameEnd, setDailyGameEnd] = useState(false)
  const [dailyResult, setDailyResult] = useState(null); 
  // Random play
  const [randomStart, setRandomStart] = useState(false)
  const [guess, setGuess] = useState([])
  const [count, setCount] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)
  const [result, setResult] = useState(false)
  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        let finalInitOptions = initOptions;
        let finalItems = items;

        const needsOptions = !initOptions || !items;

        if (needsOptions) {
          const { initOptions: fetchedOptions, items: fetchedItems } = await fetchOptions();
          finalInitOptions = fetchedOptions;
          finalItems = fetchedItems;

          setInitOptions(fetchedOptions);
          setOptions(fetchedOptions);
          setItems(fetchedItems);
        } else {
          setOptions(initOptions);
        }

        const {
          randomImage,
          randomImageItem,
          blurredRandomImage,
          unblurredRandomImage
        } = await fetchRandom(finalInitOptions, finalItems);

        setRandomImage(randomImage);
        setRandomImageItem(randomImageItem);
        setBlurredRandomImage(blurredRandomImage);
        setUnblurredRandomImage(unblurredRandomImage);

        let resolvedTodayKey = todayKey;

        if (!todayKey) {
          const {
            imageOfTheDay,
            imageOfTheDayItem,
            blurredImage,
            unblurredImage,
            todayKey: fetchedTodayKey
          } = await fetchDaily(finalInitOptions, finalItems);

          setImageOfTheDay(imageOfTheDay);
          setImageOfTheDayItem(imageOfTheDayItem);
          setBlurredImage(blurredImage);
          setUnblurredImage(unblurredImage);
          setTodayKey(fetchedTodayKey);

          resolvedTodayKey = fetchedTodayKey;
        }

        // Handle localStorage for daily result
        if (resolvedTodayKey) {
          const storedResult = localStorage.getItem(resolvedTodayKey);
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

      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [refreshKey]);

  const onChange = (event) => { 
    if (!event) return;
    
    if (!options.includes(event)) {
      console.warn("Selected option is not valid:", event);
      return;
    }

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

    if (!options.includes(event)) {
      console.warn("Selected option is not valid:", event);
      return;
    }

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
