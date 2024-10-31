import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  INVALID_CREDENTIALS,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { handleInternalServerError } from 'src/common/utils';
import { IRequestUser } from 'src/common/interfaces';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { UserRole } from 'src/common/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}
  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    try {
      const result = await this.usersRepository.update(
        { id: userId },
        { hashedRefreshToken },
      );
      if (result.affected === 0) {
        throw new NotFoundException(`${USER_NOT_FOUND}, User id: ${userId}`);
      }
      return result;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async create(
    createUserDto: CreateUserDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const newUser = this.usersRepository.create(createUserDto);
    try {
      const savedUser = await this.usersRepository.save(newUser);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE USER',
        {
          id: savedUser.id,
          data: `${savedUser.firstName} ${savedUser.lastName}`,
        },
        'SUCCESS',
      );
      return savedUser;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE USER',
        {
          id: null,
          data: `${createUserDto.firstName} ${createUserDto.lastName}`,
        },
        'FAILED TO CREATE USER',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${USER_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll({ role }: IRequestUser) {
    let allUsers: User[];
    try {
      if (role === UserRole.ADMINISTRATOR)
        allUsers = await this.usersRepository.find({
          order: { createdAt: 'DESC' },
        });
      else
        allUsers = await this.usersRepository.find({
          where: { isActive: true },
          order: { createdAt: 'DESC' },
        });

      return allUsers;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findAdmins() {
    try {
      const admins = await this.usersRepository.find({
        where: { userRole: UserRole.ADMINISTRATOR },
        order: { createdAt: 'DESC' },
      });
      return admins;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException(`${USER_NOT_FOUND}`);
    return user;
  }

  async findOneRegardlessStatus(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException(`${USER_NOT_FOUND}`);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email, isActive: true },
    });
    if (!user) throw new NotFoundException(`${INVALID_CREDENTIALS}`);
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingUser = await this.findOneRegardlessStatus(id);

    // Prohibimos actualizar los siguientes campos
    const isUnauthorizedUpdate = updateUserDto.email || updateUserDto.password;
    if (isUnauthorizedUpdate) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'TRY TO UPDATE USER',
        {
          id,
          data: `${existingUser.firstName} ${existingUser.lastName}`,
        },
        'FAILED TO UPDATE USER',
        'Attempted to update fields that are not allowed: email, password, active',
      );
      throw new ConflictException(
        'You are not allowed to update email, password, or active of the user.',
      );
    }

    const { firstName, lastName } = updateUserDto;
    if (firstName) existingUser.firstName = firstName;
    if (lastName) existingUser.lastName = lastName;
    try {
      const updatedUser = await this.usersRepository.save(existingUser);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'UPDATE USER',
        {
          id,
          data: `${updatedUser.firstName} ${updatedUser.lastName}`,
        },
        'SUCCESS',
      );
      return updatedUser;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO UPDATE USER',
        { id, data: `${updateUserDto.firstName} ${updateUserDto.lastName}` },
        'FAILED TO UPDATE USER',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async active(id: string, { fullName, role, userId }: IRequestUser) {
    const existingUser = await this.findOneRegardlessStatus(id);
    existingUser.isActive = true;
    try {
      const updatedUser = await this.usersRepository.save(existingUser);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'ACTIVE USER',
        {
          id,
          data: `${updatedUser.firstName} ${updatedUser.lastName}`,
        },
        'SUCCESS',
      );
      return updatedUser;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO ACTIVE USER',
        { id, data: 'TRY TO ACTIVE USER' },
        'FAILED TO ACTIVE USER',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async deactivate(id: string, { fullName, role, userId }: IRequestUser) {
    const existingUser = await this.findOne(id);
    try {
      const removedUser = await this.usersRepository.update(
        { id },
        { isActive: false },
      );
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DEACTIVE USER',
        { id, data: `${existingUser.firstName} ${existingUser.lastName}` },
        'SUCCESS',
      );
      return removedUser.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DEACTIVE USER',
        { id, data: `${existingUser.firstName} ${existingUser.lastName}` },
        'FAILED TO DEACTIVE USER',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async physicalRemove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingUser = await this.findOne(id);
    try {
      const removedUser = await this.usersRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'REMOVE USER',
        { id, data: `${existingUser.firstName} ${existingUser.lastName}` },
        'SUCCESS',
      );
      return removedUser.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO REMOVE USER',
        { id, data: `${existingUser.firstName} ${existingUser.lastName}` },
        'FAILED TO REMOVE USER',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
