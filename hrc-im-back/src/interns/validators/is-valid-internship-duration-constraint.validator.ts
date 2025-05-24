import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidInternshipDuration', async: false })
export class IsValidInternshipDurationConstraint
  implements ValidatorConstraintInterface
{
  validate(input: string, args: ValidationArguments): boolean {
    const regex = /(\d+)\s*(hour|hours|day|days|month|months)/i;
    const match = input.match(regex);

    if (!match) return false;

    (args.object as any).internshipDuration =
      `${match[1]} ${match[2].toLowerCase()}`;
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Invalid format for internshipDuration. Please use formats like "300 hours", "10 days", or "1 month".';
  }
}
