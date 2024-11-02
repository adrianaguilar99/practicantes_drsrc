import { BadRequestException } from '@nestjs/common';

export const validateAttendancePeriod = (intern: any, timestamp: Date) => {
  // Si ya termino su periodo de practicas no podra registrarse
  if (timestamp >= new Date(intern.internshipEnd))
    throw new BadRequestException(
      "You can't sign up. Your internship period has ended.",
    );

  // Si su periodo de practicas no ha iniciado no podra registrarse
  if (timestamp < new Date(intern.internshipStart))
    throw new BadRequestException(
      "You can't sign up. Your internship period has not started.",
    );
};
