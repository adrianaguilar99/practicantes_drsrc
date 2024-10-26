import { ApiProperty } from '@nestjs/swagger';

export class CreateInternFileDto {
  @ApiProperty({
    description: 'The file of the intern photo.',
    nullable: true,
    type: 'string',
    format: 'binary',
  })
  photo: any;

  @ApiProperty({
    description: 'The file of the CURP document.',
    nullable: true,
    type: 'string',
    format: 'binary',
  })
  curp: any;

  @ApiProperty({
    description: 'The file of the proof of address document.',
    nullable: true,
    type: 'string',
    format: 'binary',
  })
  proofOfAddress: any;

  @ApiProperty({
    description: 'The file of the birth certificate document.',
    nullable: true,
    type: 'string',
    format: 'binary',
  })
  birthCertificate: any;

  @ApiProperty({
    description: 'The file of the medical insurance document.',
    nullable: true,
    type: 'string',
    format: 'binary',
  })
  medicalInsurance: any;
}
