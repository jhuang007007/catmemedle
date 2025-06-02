import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import styles from "../styles";

function GuessHeaders() {
  return (
    <Grid container sx={styles.guessHeaders}>
      <Item size={3}>Meme Name</Item>
      <Item size={3}>Animal Color</Item>
      <Item size={3}>Animal Type</Item>
      <Item size={3}>Year Discovered</Item>
    </Grid>
  );
}

export default GuessHeaders;