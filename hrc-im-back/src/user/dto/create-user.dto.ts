import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  // LA CONTRASEÑA PUEDE MANDARSE PERO NO ES NECESARIA PARA LA CREACION
  // YA QUE CUANDO INICIEN SESION CON GOOGLE, EL PROVEEDOR DE GOOGLE NOS DARA LA CONTRASEÑA
  // @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{10,}$/, {
  //   message:
  //     'Password must be at least 10 characters long, contain one uppercase letter, and one special character.',
  // })
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  userRole?: UserRole;

  createdAt?: Date;
}
