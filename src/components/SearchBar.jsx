import Autocomplete from "@mui/material/Autocomplete";
import { TextField  } from "@mui/material";
import styles from "../styles";

function SearchBar({ options, onSelect }) {
  return (
    <Autocomplete
      options={options}
      onChange={(event, value) => onSelect(value)}
      renderInput={(params) => <TextField {...params} label="Guess a meme..." variant="outlined" />}
      sx={styles.searchbar}
    />
  );
}

export default SearchBar;