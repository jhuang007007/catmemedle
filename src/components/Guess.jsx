import { Box } from "@mui/material";
import styles from "../styles";

function Guess({guess}) {
  return (
    <Box sx={styles.guess}>
      <Box>{guess}</Box>
    </Box>
  );
}

export default Guess;