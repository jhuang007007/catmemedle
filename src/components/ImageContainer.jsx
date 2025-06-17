import { Box } from "@mui/material";
import styles from "../styles";

function ImageContainer({img}) {
  return (
    <Box 
      component="img"
      src={img}
      alt="Mystery Cat Meme (May take a few seconds to load)" 
      sx={styles.image} 
    />
  )
}

export default ImageContainer;