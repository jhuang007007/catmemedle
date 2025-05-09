import { Box } from "@mui/material";
import danny from "../assets/danny.jpg";
import styles from "../styles";

function ImageContainer() {
    return (
        <Box 
            component="img"
            src={ danny }
            alt="Mystery Cat Meme" 
            sx={styles.image} 
        />
    )
}

export default ImageContainer;