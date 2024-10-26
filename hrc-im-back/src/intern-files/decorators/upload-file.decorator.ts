import { ApiBody } from '@nestjs/swagger';

export const UploadInternFiles = (): MethodDecorator => {
  return (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          photo: {
            type: 'string',
            format: 'binary',
            description: 'Intern photo (PNG, JPG, SVG only)',
          },
          curp: {
            type: 'string',
            format: 'binary',
            description: 'CURP document (PDF only)',
          },
          proofOfAddress: {
            type: 'string',
            format: 'binary',
            description: 'Proof of address (PDF only)',
          },
          birthCertificate: {
            type: 'string',
            format: 'binary',
            description: 'Birth certificate (PDF only)',
          },
          medicalInsurance: {
            type: 'string',
            format: 'binary',
            description: 'Medical insurance document (PDF only)',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
