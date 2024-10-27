import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternFile } from './entities/intern-file.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { checkForDuplicates, rollbackFiles } from './helpers';
import { handleInternalServerError } from 'src/common/utils';
import { ENV } from 'src/configs';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { IRequestUser } from 'src/common/interfaces';

@Injectable()
export class InternFilesService {
  constructor(
    @InjectRepository(InternFile)
    private readonly internFilesRepository: Repository<InternFile>,
    private readonly internsService: InternsService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    internId: string,
    files: Express.Multer.File[],
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingIntern = await this.internsService.findOne(internId);

    const securePhotoUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[0].filename}`;
    const secureCurpUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[1].filename}`;
    const secureProofOfAddressUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[2].filename}`;
    const secureBirthCertificateUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[3].filename}`;
    const secureMedicalInsuranceUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[4].filename}`;

    const newInternFiles = this.internFilesRepository.create({
      birthCertificate: secureBirthCertificateUrl,
      curp: secureCurpUrl,
      medicalInsurance: secureMedicalInsuranceUrl,
      photo: securePhotoUrl,
      proofOfAddress: secureProofOfAddressUrl,
      intern: existingIntern,
    });
    try {
      const savedInternFiles =
        await this.internFilesRepository.save(newInternFiles);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN FILES',
        {
          id: savedInternFiles.id,
          data: `${newInternFiles}`,
        },
        'SUCCESS',
      );
      return savedInternFiles;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN FILES',
        { id: null, data: `${newInternFiles}` },
        'FAILED TO CREATE INTERN FILES',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(
          "A record already exists containing the intern's files. Only one can be created.",
        );
      rollbackFiles(internId); // Se eliminan los archivos "huerfanos" en caso de error
      handleInternalServerError(error.detail);
    }
  }

  async validateAndHandleFiles(
    files: Express.Multer.File[],
    { fullName, role, userId }: IRequestUser,
  ) {
    try {
      // Valida que exactamente cinco archivos fueron subidos
      if (files.length !== 5)
        throw new BadRequestException('Exactly five files must be uploaded');

      // Valida que el primer archivo (photo) sea una imagen
      if (!files[0].originalname.match(/\.(jpg|jpeg|png|svg)$/))
        throw new BadRequestException(
          'Only image files are allowed in the first position',
        );
      // Validacion de archivos duplicados
      checkForDuplicates(files);
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN FILES',
        { id: null, data: `${files}` },
        'FAILED TO CREATE INTERN FILES',
        error.message,
      );
      if (error instanceof BadRequestException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allInternFiles = await this.internFilesRepository.find();
      return allInternFiles;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const existingInternFiles = await this.internFilesRepository.findOne({
      where: { id },
    });
    if (!existingInternFiles)
      throw new NotFoundException('Intern files not found.');
    return existingInternFiles;
  }

  searchFiles = (internId: string, fileName: string) => {
    const path = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}/${fileName}`,
    );
    // console.log({ path });

    if (!existsSync(path))
      throw new BadRequestException(
        `Not found file not with name: ${fileName}`,
      );
    return path;
  };

  async update(
    id: string,
    internId: string,
    files: Express.Multer.File[],
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    await this.internsService.findOne(internId);
    const existingInternFiles = await this.findOne(id);

    const newSecurePhotoUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[0].filename}`;
    const oldPhotoPath = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}`,
      existingInternFiles.photo.split('/').pop(),
    );
    // console.log({ newSecurePhotoUrl, oldPhotoPath });
    if (existsSync(oldPhotoPath)) unlinkSync(oldPhotoPath);

    const newSecureCurpUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[1].filename}`;
    const oldCurpPath = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}`,
      existingInternFiles.curp.split('/').pop(),
    );
    if (existsSync(oldCurpPath)) unlinkSync(oldCurpPath);

    const newSecureProofOfAddressUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[2].filename}`;
    const oldProofOfAddressPath = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}`,
      existingInternFiles.proofOfAddress.split('/').pop(),
    );
    if (existsSync(oldProofOfAddressPath)) unlinkSync(oldProofOfAddressPath);

    const newSecureBirthCertificateUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[3].filename}`;
    const oldBirthCertificatePath = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}`,
      existingInternFiles.birthCertificate.split('/').pop(),
    );
    if (existsSync(oldBirthCertificatePath))
      unlinkSync(oldBirthCertificatePath);

    const newSecureMedicalInsuranceUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[4].filename}`;
    const oldMedicalInsurancePath = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}`,
      existingInternFiles.medicalInsurance.split('/').pop(),
    );
    if (existsSync(oldMedicalInsurancePath))
      unlinkSync(oldMedicalInsurancePath);

    const internFilesToUpdate = {
      id: existingInternFiles.id,
      birthCertificate: newSecureBirthCertificateUrl,
      curp: newSecureCurpUrl,
      medicalInsurance: newSecureMedicalInsuranceUrl,
      photo: newSecurePhotoUrl,
      proofOfAddress: newSecureProofOfAddressUrl,
    };
    try {
      await this.internFilesRepository.update(id, internFilesToUpdate);
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        'UPDATE INTERN FILES',
        {
          id,
          data: `${internFilesToUpdate}`,
        },
        'SUCCESS',
      );
      return internFilesToUpdate;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        'FAILED TO UPDATE INTERN FILES',
        {
          id,
          data: `${internFilesToUpdate}`,
        },
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(
    id: string,
    internId: string,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingInternFiles = await this.findOne(id);
    try {
      const deletedInternFiles = await this.internFilesRepository.delete(id);
      rollbackFiles(internId);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE INTERN FILES',
        { id, data: `${existingInternFiles}` },
        'SUCCESS',
      );
      return deletedInternFiles.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE INTERN FILES',
        { id, data: `${existingInternFiles}` },
        'FAILED TO DELETE INTERN FILES',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
