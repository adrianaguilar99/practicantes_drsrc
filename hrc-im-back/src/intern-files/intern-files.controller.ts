import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { InternFilesService } from './intern-files.service';
import { CreateInternFileDto } from './dto/create-intern-file.dto';
import { UpdateInternFileDto } from './dto/update-intern-file.dto';
import { UploadInternFiles } from './decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BAD_REQUEST,
  CREATE_RECORD,
  UNAUTHORIZED_ACCESS,
} from 'src/common/constants/constants';
import multerOptions from 'src/configs/multer.config';
import { InternFile } from './entities/intern-file.entity';

@ApiTags('Intern Files')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('intern-files')
export class InternFilesController {
  constructor(private readonly internFilesService: InternFilesService) {}

  @Post(':internId/upload')
  @HttpCode(201)
  @UploadInternFiles()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'curp', maxCount: 1 },
        { name: 'proofOfAddress', maxCount: 1 },
        { name: 'birthCertificate', maxCount: 1 },
        { name: 'medicalInsurance', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: `${CREATE_RECORD} Insertion of practitioner files and response of safe paths.`,
    type: InternFile,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  async uploadFiles(
    @UploadedFiles()
    files: {
      photo: Express.Multer.File[];
      curp: Express.Multer.File[];
      proofOfAddress: Express.Multer.File[];
      birthCertificate: Express.Multer.File[];
      medicalInsurance: Express.Multer.File[];
    },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    // Agrupar todos los archivos en un solo array para trabajar con ellos
    const internFiles = [
      ...(files.photo || []),
      ...(files.curp || []),
      ...(files.proofOfAddress || []),
      ...(files.birthCertificate || []),
      ...(files.medicalInsurance || []),
    ];

    // Validamos y manejamos el rollback en caso de error
    await this.internFilesService.validateAndHandleFiles(internFiles, id);

    // console.log({ internFiles });

    // Si todo sale bien, continuamos con la insercion de las rutas de los archivos
    return await this.internFilesService.create(internFiles, id);
  }
}
// const elements = files;
// for (let i = 0; i < files.length; i++)
//   if (files[i].originalname === elements[i].originalname)
//     throw new BadRequestException('El array contiene strings repetidos');

// @Get()
// findAll() {
//   return this.internFilesService.findAll();
// }

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.internFilesService.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateInternFileDto: UpdateInternFileDto) {
//   return this.internFilesService.update(+id, updateInternFileDto);
// }

// @Delete(':id')
// async remove(@Param('id', ParseUUIDPipe) id: string) {
//   return this.internFilesService.remove(id);
// }
