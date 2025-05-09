// import './App.css'
import LandingPage from './components/landingpage.jsx'
import ImageContainer from './components/ImageContainer.jsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import SearchBar from './components/SearchBar.jsx'
import Header from './components/Header.jsx'
import { Box } from '@mui/material'
import styles from './styles.jsx'

const options = ["cat meme", "cat", "meme", "funny cat", "funny meme", "cat video", "cat picture", "cat gif", "cat image", "cat photo", "cat meme generator", "cat meme maker", "cat meme template", "cat meme creator", "cat meme app", "cat meme website", "cat meme search engine"
]

function App() {
  const [dailyStart, setDailyStart] = useState(false)

  return (
    <Box>
      <Box sx={styles.container} height={"90vh"} bgcolor={"peachpuff"}>
          <Box sx={styles.container}>
            <Header />
            {!dailyStart &&  <LandingPage />}
            {!dailyStart && <Button variant="contained" onClick={() => setDailyStart(true)}>Daily</Button>}
            {dailyStart && <ImageContainer />} 
          </Box>
      </Box>
      <Box sx={styles.container}>
        {dailyStart && <SearchBar options={options}/>}
      </Box>
    </Box>
  )
}

export default App
