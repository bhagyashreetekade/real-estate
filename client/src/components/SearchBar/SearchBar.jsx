import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import "./SearchBar.css"
const SearchBar = ({filter,setFilter}) => {
  return (
    
      <div className="flexCenter search-bar " >
        <HiLocationMarker color="var(--blue)" size={25} />
        <input type="text" value={filter} style={{ width: "200px" }}  onChange={(e)=>setFilter(e.target.value)} placeholder="Search by title/city/country..."/>
        <button className="button">Search</button>
      </div>
    
  );
};

export default SearchBar;
