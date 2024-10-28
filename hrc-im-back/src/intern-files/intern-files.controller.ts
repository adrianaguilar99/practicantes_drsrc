import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { InternFilesService } from './intern-files.service';
import { UploadInternFiles } from './decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BAD_REQUEST,
  CONFLICT_ERROR,
  CREATE_RECORD,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  READ_ALL_RECORDS,
  READ_RECORD,
  REMOVE_RECORD,
  SUCCESSFUL_CREATION,
  SUCCESSFUL_DELETION,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
} from 'src/common/constants/constants';
import multerOptions from 'src/configs/multer.config';
import { InternFile } from './entities/intern-file.entity';
import { Public, UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { IApiResponse } from 'src/common/interfaces';
import { Response } from 'express';

@ApiTags('Intern Files')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('intern-files')
export class InternFilesController {
  constructor(private readonly internFilesService: InternFilesService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
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
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: `${CREATE_RECORD} Insertion of practitioner files and response of safe paths.`,
    type: InternFile,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({
    status: 409,
    description: `${CONFLICT_ERROR} Only one can be created.`,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async uploadFiles(
    @Param('internId', ParseUUIDPipe) internId: string,
    @UploadedFiles()
    files: {
      photo: Express.Multer.File[];
      curp: Express.Multer.File[];
      proofOfAddress: Express.Multer.File[];
      birthCertificate: Express.Multer.File[];
      medicalInsurance: Express.Multer.File[];
    },
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    // Agrupar todos los archivos en un solo array para trabajar con ellos
    const internFiles = [
      ...(files.photo || []),
      ...(files.curp || []),
      ...(files.proofOfAddress || []),
      ...(files.birthCertificate || []),
      ...(files.medicalInsurance || []),
    ];

    // Validamos y manejamos el rollback en caso de error
    await this.internFilesService.validateAndHandleFiles(
      internId,
      internFiles,
      user,
    );

    // Si todo sale bien, continuamos con la insercion de las rutas de los archivos
    const createdInternFiles = await this.internFilesService.create(
      internId,
      internFiles,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdInternFiles };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} All users can access this endpoint`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [InternFile],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(): Promise<IApiResponse<any>> {
    const allInternFiles = await this.internFilesService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allInternFiles,
      records: allInternFiles.length,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} All users can access this endpoint`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: InternFile,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const internFiles = await this.internFilesService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: internFiles };
  }

  @Get(':internId/:fileName')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} All users can access this endpoint`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  searchFile(
    @Res() res: Response,
    @Param('internId') internId: string,
    @Param('fileName') fileName: string,
  ) {
    const path = this.internFilesService.searchFiles(internId, fileName);
    res.sendFile(path);
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Patch(':id/:internId')
  @HttpCode(200)
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
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async updateFiles(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('internId', ParseUUIDPipe) internId: string,
    @UploadedFiles()
    files: {
      photo: Express.Multer.File[];
      curp: Express.Multer.File[];
      proofOfAddress: Express.Multer.File[];
      birthCertificate: Express.Multer.File[];
      medicalInsurance: Express.Multer.File[];
    },
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    // Agrupar todos los archivos en un solo array para trabajar con ellos
    const internFiles = [
      ...(files.photo || []),
      ...(files.curp || []),
      ...(files.proofOfAddress || []),
      ...(files.birthCertificate || []),
      ...(files.medicalInsurance || []),
    ];

    // Validamos y manejamos el rollback en caso de error
    await this.internFilesService.validateAndHandleFiles(
      internId,
      internFiles,
      user,
    );

    // Si todo sale bien, continuamos con la actualizacion de las rutas de los archivos
    const updatedInternFiles = await this.internFilesService.update(
      id,
      internId,
      internFiles,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedInternFiles };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Delete(':id/:internId')
  @HttpCode(200)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: `${REMOVE_RECORD} Delete all the practitioner's files.`,
    type: InternFile,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async deleteFiles(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('internId', ParseUUIDPipe) internId: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const deletedInternFiles = await this.internFilesService.remove(
      id,
      internId,
      user,
    );
    return { message: SUCCESSFUL_DELETION, data: deletedInternFiles };
  }
}
