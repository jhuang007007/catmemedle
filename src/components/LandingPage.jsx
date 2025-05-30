import Box from '@mui/material/Box'
import styles from '../styles';

function LandingPage() {
    return (
        <Box>
            <Box sx={styles.container} textAlign={"center"} paddingLeft={"1rem"} paddingRight={"1rem"} >
                <p>How to play:</p>
                <p>Guess the cat meme from the image. The image will begin blurred until guessed correctly or until all guesses are used.</p>
            </Box>
        </Box>
    )
}

export default LandingPage;