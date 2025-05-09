import { Box } from "@mui/material";
import danny from "../assets/danny.jpg";

function ImageContainer() {
    return (
        <Box 
            component="img"
            src={ danny }
            alt="Mystery Cat Meme" 
            sx={{ maxHeight: '300px', maxWidth: '400px', borderRadius: '4px', boxShadow: 3 }} 
        />
    )
}

export default ImageContainer;