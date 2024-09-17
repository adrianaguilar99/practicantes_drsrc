import { Search } from "@mui/icons-material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useEffect, useState } from "react";
import { fetchPokemon } from "../../api/api-request";
import { AddButton } from "../buttons/add-button.component";

interface SearchProps {
  setData: (data: any) => void; 
}
export const SearchComponent: React.FC<SearchProps> = ({ setData }) => {
  const [query, setQuery] = useState("");
  

  const handleSearch = async () => {
    const result = await fetchPokemon(query);
    setData(result);
  };

  return (
    <div className="filters-container">
      <div className="filters-search">
        <input
          type="text"
          placeholder="Buscar..."
          typeof="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <Search />
        </button>
      </div>

      <button className="filter-button">
        Filtros
        <FilterListRoundedIcon />
      </button>
      <AddButton />

      
    </div>
  );
};
