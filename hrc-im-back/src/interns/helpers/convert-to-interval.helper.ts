import { BadRequestException } from '@nestjs/common';

/**
 * Función para convertir una cadena flexible en un INTERVAL válido de PostgreSQL.
 * Acepta formatos como "300 hours", "10 days", "1 month", etc.
 */
export const convertToInterval = (input: string): string => {
  const regex = /(\d+)\s*(hour|hours|day|days|month|months)/i;
  const match = input.match(regex);

  if (!match)
    throw new BadRequestException(
      'Invalid format for internshipDuration. Please use formats like "300 hours", "10 days", or "1 month".',
    );

  const value = match[1]; // El número, por ejemplo "300"
  const unit = match[2].toLowerCase(); // La unidad de tiempo, por ejemplo "hours"

  return `${value} ${unit}`; // Regresamos el formato que espera postgres
};
