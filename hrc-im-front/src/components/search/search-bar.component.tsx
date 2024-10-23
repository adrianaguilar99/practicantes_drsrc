import { Search } from "@mui/icons-material"
import { useState } from "react";

interface SearchBarProps {
  responsive?: boolean;
  onSearch: (query: string) => void;
  }


export const SearchBar : React.FC<SearchBarProps> = ( {responsive, onSearch }) => {
  const [query, setQuery] = useState('');

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
    return (
        <div className={`filters-search  ${responsive === true ? 'phone' : null}`}>
        <input
          type="text"
          placeholder="Buscar..."
          typeof="text"
          value={query}
          onChange={InputChange}
        />
        <button >
          <Search />
        </button>
      </div>
    )
}