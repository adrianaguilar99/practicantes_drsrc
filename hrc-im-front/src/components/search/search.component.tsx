import { useState } from "react";
import { AddButton } from "../buttons/add-button.component";
import { FiltersButton } from "../utils/filters.component";
import { SearchBar } from "./search-bar.component";
import { FilterOptions } from "../utils/filters.component"; // Asegúrate de importar el tipo de datos de filtros

interface SearchProps {
  onSearch: (query: string) => void;
  onFilters?: (filters: FilterOptions) => void; 
  onAdd: () => void;
}

export const SearchComponent: React.FC<SearchProps> = ({ onSearch, onFilters, onAdd }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);  
    onSearch(value); // Ejecuta la búsqueda
  };

  const handleFilters = (filters: FilterOptions) => {
    if (onFilters) {
      onFilters(filters); // Pasar los filtros seleccionados al componente padre
    }
  };

  return (
    <div className="filters-container">
      <SearchBar onSearch={handleSearch} />
      
      {/* Pasar la función handleFilters al componente FiltersButton */}
      <FiltersButton onFilters={handleFilters} />

      <AddButton onConfirm={onAdd}/>
    </div>
  );
};
