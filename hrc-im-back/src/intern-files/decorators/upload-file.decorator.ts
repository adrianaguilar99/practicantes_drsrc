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
          compiledDocuments: {
            type: 'string',
            format: 'binary',
            description: "The rest of the intern's documents. (PDF only)",
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
