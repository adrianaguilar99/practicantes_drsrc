import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateInternFileDto } from './dto/update-intern-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InternFile } from './entities/intern-file.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { checkForDuplicates, rollbackFiles } from './helpers';
import { handleInternalServerError } from 'src/common/utils';
import { ENV } from 'src/configs';
import { join } from 'path';
import { existsSync, rmSync, unlinkSync } from 'fs';

@Injectable()
export class InternFilesService {
  constructor(
    @InjectRepository(InternFile)
    private readonly internFilesRepository: Repository<InternFile>,
    private readonly internsService: InternsService,
  ) {}

  async create(internId: string, files: Express.Multer.File[]) {
    const intern = await this.internsService.findOne(internId);

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
      intern,
    });
    try {
      const savedInternFiles =
        await this.internFilesRepository.save(newInternFiles);
      return savedInternFiles;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async validateAndHandleFiles(internId: string, files: Express.Multer.File[]) {
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
      rollbackFiles(internId); // Hacer rollback a la carpeta si ocurre un error
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

  searchFile = (internId: string, fileName: string) => {
    const path = join(
      __dirname,
      '../../',
      `${ENV.INTERN_FILES_PATH}${internId}/${fileName}`,
    );
    console.log({ path });

    if (!existsSync(path))
      throw new BadRequestException(
        `Not found file not with name: ${fileName}`,
      );
    return path;
  };

  async update(
    id: string,
    internId: string,
    {
      birthCertificate,
      curp,
      medicalInsurance,
      photo,
      proofOfAddress,
    }: UpdateInternFileDto,
    files: {
      photo?: Express.Multer.File[];
      curp?: Express.Multer.File[];
      proofOfAddress?: Express.Multer.File[];
      birthCertificate?: Express.Multer.File[];
      medicalInsurance?: Express.Multer.File[];
    },
  ) {
    const existingInternFiles = await this.findOne(id);
    await this.internsService.findOne(internId);

    let newSecurePhotoUrl: string = photo;
    if (photo) {
      newSecurePhotoUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[0].filename}`;
      const oldPhotoPath = join(
        __dirname,
        '../../',
        ENV.INTERN_FILES_PATH,
        existingInternFiles.photo.split('/').pop(),
      );
      if (existsSync(oldPhotoPath)) unlinkSync(oldPhotoPath);
    }

    let newSecureCurpUrl: string = curp;
    if (curp) {
      newSecureCurpUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[1].filename}`;
      const oldCurpPath = join(
        __dirname,
        '../../',
        ENV.INTERN_FILES_PATH,
        existingInternFiles.curp.split('/').pop(),
      );
      if (existsSync(oldCurpPath)) unlinkSync(oldCurpPath);
    }

    let newSecureProofOfAddressUrl: string = proofOfAddress;
    if (proofOfAddress) {
      newSecureProofOfAddressUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[2].filename}`;
      const oldProofOfAddressPath = join(
        __dirname,
        '../../',
        ENV.INTERN_FILES_PATH,
        existingInternFiles.proofOfAddress.split('/').pop(),
      );
      if (existsSync(oldProofOfAddressPath)) unlinkSync(oldProofOfAddressPath);
    }

    let newSecureBirthCertificateUrl: string = birthCertificate;
    if (birthCertificate) {
      newSecureBirthCertificateUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[3].filename}`;
      const oldBirthCertificatePath = join(
        __dirname,
        '../../',
        ENV.INTERN_FILES_PATH,
        existingInternFiles.birthCertificate.split('/').pop(),
      );
      if (existsSync(oldBirthCertificatePath))
        unlinkSync(oldBirthCertificatePath);
    }

    let newSecureMedicalInsuranceUrl: string = medicalInsurance;
    if (medicalInsurance) {
      newSecureMedicalInsuranceUrl = `${ENV.HOST_API}/api/intern-files/${internId}/${files[4].filename}`;
      const oldMedicalInsurancePath = join(
        __dirname,
        '../../',
        ENV.INTERN_FILES_PATH,
        existingInternFiles.medicalInsurance.split('/').pop(),
      );
      if (existsSync(oldMedicalInsurancePath))
        unlinkSync(oldMedicalInsurancePath);
    }

    try {
      const updatedInternFiles =
        await this.internFilesRepository.save(existingInternFiles);
      return updatedInternFiles;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, internId: string) {
    await this.findOne(id);
    try {
      const deletedInternFiles = await this.internFilesRepository.delete(id);
      rollbackFiles(internId);
      return deletedInternFiles.affected;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
