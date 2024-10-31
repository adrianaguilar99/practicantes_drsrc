import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(outTime: string, args: ValidationArguments) {
    const [inTimeKey] = args.constraints;
    const inTime = (args.object as any)[inTimeKey];

    // Convertir a objetos Date para comparar las horas
    const inDate = new Date(`1970-01-01T${inTime}`);
    const outDate = new Date(`1970-01-01T${outTime}`);

    return inDate < outDate; // Validar que la hora de salida es después de la de entrada
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be after ${args.constraints[0]}`;
  }
}
