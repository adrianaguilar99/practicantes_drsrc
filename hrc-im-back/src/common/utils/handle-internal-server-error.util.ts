import { InternalServerErrorException } from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../constants/constants';

export function handleInternalServerError(message: string): void {
  throw new InternalServerErrorException(
    `${INTERNAL_SERVER_ERROR}. Details: ${message}`,
  );
}
