import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

function SearchBar({ options, onSelect }) {
    return (
        <Autocomplete
            freeSolo
            options={options}
            onChange={(event, value) => onSelect(value)}
            renderInput={(params) => <TextField {...params} label="Guess a meme..." variant="outlined" />}
            sx={{width: '80%', backgroundColor: 'white'}}
        />
    );
}

export default SearchBar;