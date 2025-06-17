import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import styles from "../styles";

function GuessHeaders() {
  return (
    <Grid container spacing={1} sx={styles.guessHeaders}>
      <Item sx={styles.guessHeadersItem} size={3}>Meme Name</Item>
      <Item sx={styles.guessHeadersItem} size={3}>Animal Color</Item>
      <Item sx={styles.guessHeadersItem} size={3}>Animal Type</Item>
      <Item sx={styles.guessHeadersItem} size={3}>Year Discovered</Item>
    </Grid>
  );
}

export default GuessHeaders;