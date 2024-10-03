import React, { useState, useRef, useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { SearchBar } from "../search/search-bar.component";
import { useLocation } from "react-router-dom"; // Importa useLocation

export const FiltersButton = () => {
  const location = useLocation(); // Obtén la ubicación actual (URL)

  // Define las opciones según la URL
  const getFilterOptions = () => {
    switch (location.pathname) {
      case "/supervisors":
        return [
            { title: "A - Z" },
            { title: "Z - A" },
            
        ];
      case "/departments":
        return [
          { title: "A - Z" },
          { title: "Z - A" },
        ];
      case "/interns":
        return [
            { title: "A - Z" },
            { title: "Z - A" },
            { title: "Tipo", divider: true },
            { title: "Externos" },
            { title: "Internos" },
            { title: "Departamento", divider: true },
        ];
      default:
        return [
          { title: "A - Z" },
          { title: "Z - A" },
        ];
    }
  };

  const filterOptions = getFilterOptions();

  const [checked, setChecked] = useState<boolean[]>(new Array(filterOptions.length).fill(false));
  const [showRectangle, setShowRectangle] = useState(false);

  const rectangleRef = useRef<HTMLDivElement | null>(null);

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

  const handleCheckboxChange = (index: number) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];

      if (index === 0 && newChecked[1]) {
        newChecked[1] = false;
      }

      if (index === 1 && newChecked[0]) {
        newChecked[0] = false;
      }

      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  return (
    <div>
      <button
        className="filter-button"
        onClick={() => setShowRectangle(!showRectangle)}
      >
        Filtros
        <FilterListRoundedIcon />
      </button>

      {showRectangle && (
        <div ref={rectangleRef} className="filter-rectangle">
          <SearchBar
            query=""
            responsive={true}
            onChange={() => {}}
            onClick={() => {}}
          />
          {filterOptions.map((option, index) => (
            <FiltersOptions
              key={index}
              title={option.title}
              divider={option.divider}
              checked={checked[index]}
              onChange={() => handleCheckboxChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
      {divider === true ? 
      <div className="filter-divider" > 
      <label>{title}</label>
      </div>
      : 
       <div className="filters-option">
          <input
            type="checkbox"
            id={inputId}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={inputId}>{title}</label>
        </div>}
       
      </>
    );
  };
  
