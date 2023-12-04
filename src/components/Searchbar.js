import { SearchRounded as SearchIcon } from "@mui/icons-material"
import { useState } from "react";

const Searchbar = (props) => {
const [inputValue, setInputValue] = useState('Sofia, Bulgaria');

const handleSearchButton = () => {
  props.handleSearchbar(inputValue);
}

  return (
    <div className="searchbar glassmorphic">
        <input className="searchbar__input" placeholder="Sofia, Bulgaria" onChange={(event)=>{setInputValue(event.target.value)}}/>
        <button className="searchbar__search-btn" onClick={handleSearchButton}><SearchIcon/></button>
    </div>
  )
}

export default Searchbar