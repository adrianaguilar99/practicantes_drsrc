import { Search } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { AddButton } from "../buttons/add-button.component";
import { FiltersButton } from "../utils/filters.component";
import { SearchBar } from "./search-bar.component";

interface SearchProps {
  setData: (data: any) => void; 
}
export const SearchComponent: React.FC<SearchProps> = ({ setData }) => {
  const [query, setQuery] = useState("");
  

  const handleSearch = async () => {
    
  };

  return (
    <div className="filters-container">
      <SearchBar
        query={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} 
        onClick={handleSearch} 
      />

      <FiltersButton />

     
      <AddButton />

      
    </div>
  );
};
