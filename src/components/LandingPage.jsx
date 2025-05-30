import Box from '@mui/material/Box'
import styles from '../styles';

function LandingPage() {
    return (
        <Box>
            <Box sx={styles.container} textAlign={"center"} paddingLeft={"1rem"} paddingRight={"1rem"} >
                <p>How to play:</p>
                <p>Guess the cat meme from the blurred image. The image will be revealed upon guessing correctly or using all five guesses.</p>
            </Box>
        </Box>
    )
}

export default LandingPage;