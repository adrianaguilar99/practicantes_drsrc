import { ApiBody } from '@nestjs/swagger';

export const RegisterAttendance = (): MethodDecorator => {
  return (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          internCode: {
            type: 'string',
            description: 'Intern code',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
