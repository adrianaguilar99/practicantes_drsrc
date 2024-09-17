import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { GetUrl } from '../../functions/utils.functions';
import { useEffect, useState } from 'react';

export const AddButton = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const handleUrlChange = () => {
      const enurl = GetUrl();
      setUrl(enurl);
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return (
    url !== "audits" ? (
      <button className="add-button">
        Agregar
        {url === "departments" ? (
          <DomainAddIcon />
        ) : (
          <PersonAddAlt1OutlinedIcon />
        )}
      </button>
    ) : null
  );
};
