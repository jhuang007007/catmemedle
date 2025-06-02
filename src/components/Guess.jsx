import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import styles from "../styles";
import ForwardIcon from '@mui/icons-material/Forward';

function checkColorGuess( guess, answer ) {
  const answerSet = new Set(answer.animalColor);
  const guessSet = new Set(guess.animalColor);

  const matches = [...guessSet].filter(color => answerSet.has(color));

  if (matches.length === 0) {
    return 0;
  } else if (matches.length === answerSet.size && matches.length === guessSet.size) {
    return 1;
  } else {
    return 2;
  }
}

function checkYearGuess( guess, answer ) {
  if (guess.memeYear < answer.memeYear) {
    return 0;
  } else if (guess.memeYear > answer.memeYear) {
    return 1;
  }
}

function Guess({ guess, answer }) {
  const guessColors = guess.animalColor.join(", ");
  return (
    <Grid container spacing={1} sx={styles.guess}>
      <Item size={3} sx={guess.memeName === answer.memeName && styles.guessCorrect || styles.guessIncorrect}>{guess.memeName}</Item>
      
      <Item size={3} 
      sx={checkColorGuess(guess, answer) === 0 && styles.guessIncorrect || 
        checkColorGuess( guess, answer ) === 1 && styles.guessCorrect || 
        checkColorGuess( guess, answer ) === 2 && styles.guessPartiallyCorrect}>{guessColors}</Item>
      <Item size={3} sx={guess.animalType === answer.animalType && styles.guessCorrect || styles.guessIncorrect}>{guess.animalType}</Item>
      <Item position={'relative'} size={3} sx={guess.memeYear === answer.memeYear && styles.guessCorrect || styles.guessIncorrect}>
        <Item position={'relative'} zIndex={10}>{guess.memeYear}</Item>
        {checkYearGuess( guess, answer ) === 1 && <ForwardIcon  sx={styles.downIcon} />}
        {checkYearGuess( guess, answer ) === 0 && <ForwardIcon  sx={styles.upIcon} />}
      </Item>
    </Grid>
  );
}

export default Guess;