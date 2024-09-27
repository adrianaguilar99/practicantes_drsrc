import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career } from './entities/career.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRole, SubmissionStatus } from 'src/common/enums';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCareerDto: CreateCareerDto, { id }: User) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (
      user.userRole === UserRole.SUPERVISOR &&
      createCareerDto.status !== SubmissionStatus.PENDING &&
      createCareerDto.status !== SubmissionStatus.ACCEPTED
    ) {
      throw new ForbiddenException(
        'Supervisors can only create careers with status PENDING or ACCEPTED.',
      );
    }

    if (user.userRole === UserRole.ADMINISTRATOR)
      createCareerDto.status =
        createCareerDto.status || SubmissionStatus.PENDING;
    else createCareerDto.status = SubmissionStatus.PENDING;

    const career = this.careerRepository.create({
      ...createCareerDto,
      submittedBy: user,
    });

    return await this.careerRepository.save(career);
  }

  async findAll() {
    return await this.careerRepository.find();
  }

  async findOne(id: string) {
    return await this.careerRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateCareerDto: UpdateCareerDto,
    { id: userId }: User,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (user.userRole !== UserRole.ADMINISTRATOR)
      throw new ForbiddenException('Only administrators can update careers.');

    await this.careerRepository.update(id, updateCareerDto);
    return await this.findOne(id);
  }

  async remove(id: string, { id: userId }: User) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (user.userRole !== UserRole.ADMINISTRATOR)
      throw new ForbiddenException('Only administrators can delete careers.');
    return await this.careerRepository.delete(id);
  }
}

// TODO probar los modulos de login usuario y carrera, podemos usar el service de user en ves de el repositorio?? probar
