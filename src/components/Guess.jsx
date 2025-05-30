import { Box } from "@mui/material";
import styles from "../styles";

function Guess({guess , result}) {
  return (
    <Box sx={styles.guess}>
      <Box>{!result && "❌" || "✔️"}{guess}</Box>
    </Box>
  );
}

export default Guess;