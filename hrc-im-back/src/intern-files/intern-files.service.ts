import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInternFileDto } from './dto/create-intern-file.dto';
import { UpdateInternFileDto } from './dto/update-intern-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InternFile } from './entities/intern-file.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { checkForDuplicates, rollbackFiles } from './helpers';
import { handleInternalServerError } from 'src/common/utils';
import { ENV } from 'src/configs';

@Injectable()
export class InternFilesService {
  constructor(
    @InjectRepository(InternFile)
    private readonly internFilesRepository: Repository<InternFile>,
    private readonly internsService: InternsService,
  ) {}

  async create(files: Express.Multer.File[], internId: string) {
    const intern = await this.internsService.findOne(internId);

    const securePhotoUrl = `${ENV.SERVER_URL}/intern-files/${internId}/${files[0].filename}`;
    const secureCurpUrl = `${ENV.SERVER_URL}/intern-files/${internId}/${files[1].filename}`;
    const secureProofOfAddressUrl = `${ENV.SERVER_URL}/intern-files/${internId}/${files[2].filename}`;
    const secureBirthCertificateUrl = `${ENV.SERVER_URL}/intern-files/${internId}/${files[3].filename}`;
    const secureMedicalInsuranceUrl = `${ENV.SERVER_URL}/intern-files/${internId}/${files[4].filename}`;

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

  async validateAndHandleFiles(files: Express.Multer.File[], internId: string) {
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
}
// findAll() {
//   return `This action returns all internFiles`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} internFile`;
// }

// update(id: number, updateInternFileDto: UpdateInternFileDto) {
//   return `This action updates a #${id} internFile`;
// }

// remove(id: number) {
//   return `This action removes a #${id} internFile`;
// }
