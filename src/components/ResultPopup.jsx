import { Box } from "@mui/material";
import styles from "../styles";

function ResultPopup({ result, answer }) {
  return (
    <Box sx={styles.resultpopup}>
      {result && <p>Your guess was correct!</p>}
      <p>The correct answer was { answer }.</p>
    </Box> 
  );
}

export default ResultPopup;