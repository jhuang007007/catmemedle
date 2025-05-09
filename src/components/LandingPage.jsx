import Box from '@mui/material/Box'
import styles from '../styles';

function LandingPage() {
    return (
        <Box>
            <Box sx={styles.container}>
                <p>How to play:</p>
                <p>Guess the cat meme from the image. The image will begin blurred and will gradually beome less blurred with each guess.</p>
            </Box>
        </Box>
    )
}

export default LandingPage;