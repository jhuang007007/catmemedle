import { Box } from "@mui/material";
import styles from "../styles";

function ResultPopup() {
  return (
    <Box
      sx={styles.resultpopup}
    >
      <h2>Result</h2>
      <p>Your guess was correct!</p>
    </Box> 
  );
}

export default ResultPopup;