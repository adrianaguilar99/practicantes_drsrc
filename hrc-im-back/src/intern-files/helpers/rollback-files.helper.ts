import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { ENV } from 'src/configs';

export const rollbackFiles = (internId: string) => {
  const folderPath = join(`${ENV.INTERN_FILES_PATH}${internId}`);
  // console.log({ folderPath });

  if (existsSync(folderPath)) {
    // Eliminar la carpeta completa del practicante junto con su contenido
    rmSync(folderPath, { recursive: true });
  }
};
