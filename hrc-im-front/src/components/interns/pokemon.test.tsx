import React from 'react';
import { PokemonInterface } from '../../interfaces/tests/tests.interface';

interface TableProps {
  data: PokemonInterface | null; 
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  if (!data) {
    return <div>No data available</div>; 
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Altura</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.height}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;
