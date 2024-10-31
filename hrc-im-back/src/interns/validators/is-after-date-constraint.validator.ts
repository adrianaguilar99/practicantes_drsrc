import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAfterDateConstraint implements ValidatorConstraintInterface {
  validate(endDate: string, args: ValidationArguments) {
    const [startDateKey] = args.constraints;
    const startDate = (args.object as any)[startDateKey];
    return new Date(startDate) < new Date(endDate); // Validar que la fecha de fin sea después de la de inicio
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be after ${args.constraints[0]}`;
  }
}
