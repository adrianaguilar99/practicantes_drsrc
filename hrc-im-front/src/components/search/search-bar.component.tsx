import { Search } from "@mui/icons-material"

interface SearchBarProps {
    query: string;
    responsive?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Cambia el tipo de onChange
    onClick: () => void;
  }


export const SearchBar : React.FC<SearchBarProps> = ( { query,responsive, onChange, onClick }) => {
    return (
        <div className={`filters-search  ${responsive === true ? 'phone' : null}`}>
        <input
          type="text"
          placeholder="Buscar..."
          typeof="text"
          value={query}
          onChange={onChange}
        />
        <button onClick={onClick}>
          <Search />
        </button>
      </div>
    )
}