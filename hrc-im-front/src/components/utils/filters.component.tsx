import React, { useState, useRef, useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { SearchBar } from "../search/search-bar.component";
import { useLocation } from "react-router-dom";

export const FiltersButton = () => {
  const location = useLocation();
  const [orderfilters, setOrderFilters] = useState<string[]>([]);
  const [typefilters, setTypeFilters] = useState<string[]>([]);
  const [progressfilters, setProgressFilters] = useState<string[]>([]);
  const [departmentfilters, setDepartmentFilters] = useState<string[]>([]);

  // Define las opciones según la URL
  const getFilterOptions = () => {
    switch (location.pathname) {
      case "/supervisors":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" }
        ];
      case "/departments":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" }
        ];
      case "/interns":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
          { title: "Tipo", divider: true },
          { title: "Externos" },
          { title: "Internos" },
          { title: "Progreso", divider: true },
          { title: "Completado" }
        ];
      default:
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" }
        ];
    }
  };

  const departments = [
    { id: 1, name: "RECURSOS HUMANOS" },
    { id: 2, name: "TECNOLOGÍAS DE INFORMACIÓN" },
    { id: 3, name: "CONTABILIDAD" },
    { id: 4, name: "ENTRENAMIENTO" },
    { id: 5, name: "FINANZAS" },
    { id: 6, name: "SISTEMAS" },
    { id: 7, name: "INVESTIGACIÓN" },
    { id: 8, name: "ADMINISTRACIÓN" },
    { id: 9, name: "MARKETING" },
    { id: 10, name: "DISEÑO" },
    { id: 11, name: "COMUNICACIÓN" },
    { id: 12, name: "SALUD" },
    { id: 13, name: "OTROS" }
  ];

  const filterOptions = getFilterOptions();

  // Estado de checkboxes
  const [checked, setChecked] = useState<boolean[]>(
    new Array(filterOptions.length + departments.length).fill(false)
  );
  const [showRectangle, setShowRectangle] = useState(false);

  const rectangleRef = useRef<HTMLDivElement | null>(null);

  // Manejo de clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rectangleRef.current && !rectangleRef.current.contains(event.target as Node)) {
        setShowRectangle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Maneja el cambio de los checkboxes
  const handleCheckboxChange = (index: number, title: string) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];

      if (newChecked[index]) {
        if (index < filterOptions.length) {
          const option = filterOptions[index].title;
          if (option.includes("A - Z") || option.includes("Z - A")) {
            setOrderFilters([...orderfilters, option]);
          } else if (option === "Externos" || option === "Internos") {
            setTypeFilters([...typefilters, option]);
          } else if (option === "Completado") {
            setProgressFilters([...progressfilters, option]);
          }
        } else {
          const department = departments[index - filterOptions.length].name;
          setDepartmentFilters([...departmentfilters, department]);
        }
      } else {
        if (index < filterOptions.length) {
          const option = filterOptions[index].title;
          if (option.includes("A - Z") || option.includes("Z - A")) {
            setOrderFilters(orderfilters.filter((f) => f !== option));
          } else if (option === "Externos" || option === "Internos") {
            setTypeFilters(typefilters.filter((f) => f !== option));
          } else if (option === "Completado") {
            setProgressFilters(progressfilters.filter((f) => f !== option));
          }
        } else {
          const department = departments[index - filterOptions.length].name;
          setDepartmentFilters(departmentfilters.filter((f) => f !== department));
        }
      }

      return newChecked;
    });
  };

  // Maneja el botón de limpiar filtros
  const handleClearFilters = () => {
    setChecked(new Array(filterOptions.length + departments.length).fill(false));
    setOrderFilters([]);
    setTypeFilters([]);
    setProgressFilters([]);
    setDepartmentFilters([]);
  };

  return (
    <div>
      <button className="filter-button" onClick={() => setShowRectangle(!showRectangle)}>
        Filtros
        <FilterListRoundedIcon />
      </button>

      {showRectangle && (
        <div ref={rectangleRef} className="filter-rectangle">
          <SearchBar query="" responsive={true} onChange={() => {}} onClick={() => {}} />
          {(orderfilters.length > 0 ||
            typefilters.length > 0 ||
            progressfilters.length > 0 ||
            departmentfilters.length > 0) && (
            <button className="clear-filters-button" onClick={handleClearFilters}>
              Limpiar Filtros
            </button>
          )}

          <div className="filters-grid">
            <div className="filters-column">
              {filterOptions.map((option, index) => (
                <FiltersOptions
                  key={index}
                  title={option.title}
                  divider={option.divider}
                  checked={checked[index]}
                  onChange={() => handleCheckboxChange(index, option.title)}
                />
              ))}
            </div>

            {location.pathname === "/interns" && (
              <div className="filters-column">
                <div className="filter-divider">
                  <label>Departamento</label>
                </div>
                {departments.map((department, index) => (
                  <FiltersOptions
                    key={department.id}
                    title={department.name}
                    checked={checked[filterOptions.length + index]}
                    onChange={() => handleCheckboxChange(filterOptions.length + index, department.name)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para los filtros y departamentos
export interface FiltersOptionsProps {
  title: string;
  divider?: boolean;
  checked: boolean;
  onChange: () => void;
}

export const FiltersOptions: React.FC<FiltersOptionsProps> = ({
  title,
  checked,
  divider = false,
  onChange,
}) => {
  const inputId = `checkbox-${title}`;

  return (
    <>
      {divider ? (
        <div className="filter-divider">
          <label>{title}</label>
        </div>
      ) : (
        <div className="filters-option">
          <input type="checkbox" id={inputId} checked={checked} onChange={onChange} />
          <label htmlFor={inputId}>{title}</label>
        </div>
      )}
    </>
  );
};
