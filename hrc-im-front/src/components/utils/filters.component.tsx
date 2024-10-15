import React, { useState, useRef, useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { SearchBar } from "../search/search-bar.component";
import { useLocation } from "react-router-dom";
import { departments } from "./testdepartments";
import { decryptData } from "../../functions/encrypt-data.function";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface FilterOptions {
  order?: string;
  type?: string;
  progress?: string;
  department?: string[];
}

interface FiltersProps {
  onSearch?: (query: string) => void;
  onFilters?: (filters: FilterOptions) => void;
}

export const FiltersButton: React.FC<FiltersProps> = ({
  onSearch,
  onFilters,
}) => {
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const location = useLocation();
  const [orderfilters, setOrderFilters] = useState<string[]>([]);
  const [typefilters, setTypeFilters] = useState<string[]>([]);
  const [progressfilters, setProgressFilters] = useState<string[]>([]);
  const [departmentfilters, setDepartmentFilters] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const getFilterOptions = () => {
    switch (location.pathname) {
      case "/supervisors":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
        ];
      case "/departments":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
        ];
      case "/supervisors":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
        ];
      case "/interns":
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
          { title: "Tipo", divider: true },
          { title: "EXTERNO" },
          { title: "INTERNO" },
          { title: "Progreso", divider: true },
          { title: "Completado" },
        ];
      case "/audits":
        return [
          { title: "Tipo", divider: true },
          { title: "ACTUALIZACIÓN" },
          { title: "INSERCIÓN" },
          { title: "ELIMINACION" },
          { title: "Entidad", divider: true },
          { title: "INTERNO" },
          { title: "DEPARTAMENTO" },
          { title: "CARRERA" },
          { title: "INSTITUCIÓN" },
        ];
      default:
        return [
          { title: "Orden", divider: true },
          { title: "A - Z" },
          { title: "Z - A" },
        ];
    }
  };

  const filterOptions = getFilterOptions();
  const [checked, setChecked] = useState<boolean[]>(
    new Array(filterOptions.length + departments.length).fill(false)
  );
  const [showRectangle, setShowRectangle] = useState(false);

  const rectangleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ClickOutside = (event: MouseEvent) => {
      if (
        rectangleRef.current &&
        !rectangleRef.current.contains(event.target as Node)
      ) {
        setShowRectangle(false);
      }
    };

    document.addEventListener("mousedown", ClickOutside);
    return () => {
      document.removeEventListener("mousedown", ClickOutside);
    };
  }, []);

  const applyFilters = () => {
    const filters: FilterOptions = {
      order: orderfilters.length > 0 ? orderfilters[0] : undefined,
      type: typefilters.length > 0 ? typefilters[0] : undefined,
      progress: progressfilters.length > 0 ? progressfilters[0] : undefined,
      department: departmentfilters.length > 0 ? departmentfilters : undefined,
    };

    if (onFilters) {
      onFilters(filters);
    }
  };

  const CheckboxChange = (index: number, title: string) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];

      if (title === "A - Z" || title === "Z - A") {
        const azIndex = filterOptions.findIndex(
          (option) => option.title === "A - Z"
        );
        const zaIndex = filterOptions.findIndex(
          (option) => option.title === "Z - A"
        );

        if (title === "A - Z") {
          newChecked[zaIndex] = false;
        } else if (title === "Z - A") {
          newChecked[azIndex] = false;
        }
        newChecked[index] = !newChecked[index];
        setOrderFilters([title]);
      } else {
        newChecked[index] = !newChecked[index];

        if (newChecked[index]) {
          if (title === "EXTERNO" || title === "INTERNO") {
            setTypeFilters([...typefilters, title]);
          } else if (title === "Completado") {
            setProgressFilters([...progressfilters, title]);
          } else if (index >= filterOptions.length) {
            const department = departments[index - filterOptions.length].name;
            setDepartmentFilters([...departmentfilters, department]);
          }
        } else {
          if (title === "EXTERNO" || title === "INTERNO") {
            setTypeFilters(typefilters.filter((f) => f !== title));
          } else if (title === "Completado") {
            setProgressFilters(progressfilters.filter((f) => f !== title));
          } else if (index >= filterOptions.length) {
            const department = departments[index - filterOptions.length].name;
            setDepartmentFilters(
              departmentfilters.filter((f) => f !== department)
            );
          }
        }
      }

      return newChecked;
    });
  };

  const ClearFilters = () => {
    setChecked(
      new Array(filterOptions.length + departments.length).fill(false)
    );
    setOrderFilters([]);
    setTypeFilters([]);
    setProgressFilters([]);
    setDepartmentFilters([]);
    applyFilters();
  };

  const Search = (value: string) => {
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
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
          <SearchBar onSearch={Search} responsive={true} />
          <section className="filter-rectangle-header">
            <button className="apply-filters-button" onClick={applyFilters}>
              {" "}
              Aplicar Filtros
            </button>
            {(orderfilters.length > 0 ||
              typefilters.length > 0 ||
              progressfilters.length > 0 ||
              departmentfilters.length > 0) && (
              <button
                className="clear-filters-button"
                onClick={() => ClearFilters()}
              >
                Limpiar Filtros
              </button>
            )}
          </section>

          <div className="filters-grid">
            <div className="filters-column">
              {filterOptions.map((option, index) => (
                <FiltersOptions
                  key={index}
                  title={option.title}
                  divider={option.divider}
                  checked={checked[index]}
                  onChange={() => CheckboxChange(index, option.title)}
                />
              ))}
            </div>

            {userRol != "SUPERVISOR" &&(location.pathname === "/interns" ||
              location.pathname === "/supervisors"
            || location.pathname === "/checkin-checkout") && (
              <div className="filters-column">
                <div className="filter-divider">
                  <label>Departamento</label>
                </div>
                {departments.map((department, index) => (
                  <FiltersOptions
                    key={department.id}
                    title={department.name}
                    checked={checked[filterOptions.length + index]}
                    onChange={() =>
                      CheckboxChange(
                        filterOptions.length + index,
                        department.name
                      )
                    }
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
          <input
            type="checkbox"
            id={inputId}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={inputId}>{title}</label>
        </div>
      )}
    </>
  );
};
