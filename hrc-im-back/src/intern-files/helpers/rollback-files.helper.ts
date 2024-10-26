import { existsSync, rmSync } from 'fs';
import { join } from 'path';

export const rollbackFiles = (internId: string) => {
  const folderPath = join(`public/intern-files/${internId}`);
  // console.log({ folderPath });

  if (existsSync(folderPath)) {
    // Eliminar la carpeta completa del practicante junto con su contenido
    rmSync(folderPath, { recursive: true });
  }
};
