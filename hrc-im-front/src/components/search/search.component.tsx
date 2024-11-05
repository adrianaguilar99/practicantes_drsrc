import { useEffect, useState } from "react";
import { AddButton } from "../buttons/add-button.component";
import { FiltersButton } from "../utils/filters.component";
import { SearchBar } from "./search-bar.component";
import { FilterOptions } from "../utils/filters.component"; // Asegúrate de importar el tipo de datos de filtros
import { DeleteAllRecordsButton } from "../buttons/delete-allrecords-button.component";
import { useSelector } from "react-redux";
import { decryptData } from "../../functions/encrypt-data.function";
import { RootState } from "../../redux/store";
import { GetUrl } from "../../functions/utils.functions";
import { FormModal } from "../modals/form-modal.component";
import { ButtonComponent } from "../buttons/buttons.component";

interface SearchProps {
  onSearch: (query: string) => void;
  onFilters?: (filters: FilterOptions) => void; 
  onAdd: () => void;
}

export const SearchComponent: React.FC<SearchProps> = ({ onSearch, onFilters, onAdd }) => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const [query, setQuery] = useState('');
  const url = GetUrl();
  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const Close = () => setOpen(false);

  const Search = (value: string) => {
    setQuery(value);  
    onSearch(value); 
  };

  const Filters = (filters: FilterOptions) => {
    if (onFilters) {
      onFilters(filters); 
    }
  };

  const Click = () => {
    Open();
  };

  const onConfirm = () => {
    Close();
  };

  return (
    <div className="filters-container">
      <SearchBar onSearch={Search} />
      
      <FiltersButton onFilters={Filters} />

      <AddButton onConfirm={onAdd} userRol={userRol}/>

      {userRol === 'ADMINISTRATOR' && url != 'interns'  && url != 'supervisors' && url != 'administrators' && url != 'audits' && url != 'checkin-checkout' && <DeleteAllRecordsButton />}
       
       {url === 'interns' && 
          <ButtonComponent
          text="Generar un reporte"
             onClick={Click}
             style={{maxWidth: '200px'}}
            />
       }
    
               
      <FormModal
        open={open}
        onConfirm={onConfirm}
        onCancel={Close}
        title="Generar reporte de los practicantes"
        type="Generete"
        entity="report"
      />
    </div>
  );
};
