import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { styled } from '@mui/material/styles';
import styles from "../styles";
import ForwardIcon from '@mui/icons-material/Forward';

const Item = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

function checkColorGuess(guess, answer) {
  const answerSet = new Set(answer.animalColor);
  const guessSet = new Set(guess.animalColor);
  const matches = [...guessSet].filter(color => answerSet.has(color));
  if (matches.length === 0) return 0;
  if (matches.length === answerSet.size && matches.length === guessSet.size) return 1;
  return 2;
}

function checkYearGuess(guess, answer) {
  if (guess.memeYear < answer.memeYear) return 0;
  if (guess.memeYear > answer.memeYear) return 1;
  return -1;
}

function Guess({ guess, answer }) {
  const guessColors = guess.animalColor.join(", ");
  const fadeDuration = 800;
  const totalItems = 4;
  const [visibleItems, setVisibleItems] = useState(Array(totalItems).fill(false));

  useEffect(() => {
    visibleItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, fadeDuration * index); // stagger: each waits for previous to complete
    });
  }, [guess]); // Re-run on new guess

  const items = [
    {
      key: "memeName",
      content: guess.memeName,
      sx: guess.memeName === answer.memeName ? styles.guessCorrect : styles.guessIncorrect,
    },
    {
      key: "animalColor",
      content: guessColors,
      sx:
        checkColorGuess(guess, answer) === 1
          ? styles.guessCorrect
          : checkColorGuess(guess, answer) === 2
          ? styles.guessPartiallyCorrect
          : styles.guessIncorrect,
    },
    {
      key: "animalType",
      content: guess.animalType,
      sx: guess.animalType === answer.animalType ? styles.guessCorrect : styles.guessIncorrect,
    },
    {
      key: "memeYear",
      content: (
        <>
          <Item position="relative" zIndex={10}>{guess.memeYear}</Item>
          {checkYearGuess(guess, answer) === 1 && <ForwardIcon sx={styles.downIcon} />}
          {checkYearGuess(guess, answer) === 0 && <ForwardIcon sx={styles.upIcon} />}
        </>
      ),
      sx: guess.memeYear === answer.memeYear ? styles.guessCorrect : styles.guessIncorrect,
      position: "relative"
    },
  ];

  return (
    <Grid container spacing={1} sx={styles.guess}>
      {items.map((item, index) => (
        <Fade
          in={visibleItems[index]}
          timeout={fadeDuration}
          key={item.key}
        >
          <Item size={3} sx={item.sx} position={item.position || 'static'}>
            {item.content}
          </Item>
        </Fade>
      ))}
    </Grid>
  );
}

export default Guess;