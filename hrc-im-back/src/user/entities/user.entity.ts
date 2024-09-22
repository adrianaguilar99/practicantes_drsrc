import { UserRole } from 'src/common/enums/user-role.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from 'src/common/constants/constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: false, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  hashedPassword: string;

  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  userRole: UserRole;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: string;

  /*
   Agregamos el decorador para manejar la fecha antes de insertar el registro
   Y la asignacion del rol mediante el email
  */
  @BeforeInsert()
  async setCreation() {
    this.email = this.email.toLowerCase();
    await this.hashPassword();
    this.setUserRole();
    this.setCreationDate();
  }

  async hashPassword() {
    this.hashedPassword = await bcrypt.hash(
      this.hashedPassword,
      BCRYPT_SALT_ROUNDS,
    );
  }
  private setUserRole() {
    const domain = this.email.split('@')[1];
    switch (domain) {
      case 'google.com':
        this.userRole = UserRole.ADMINISTRATOR;
        break;
      case 'facebook.com':
        this.userRole = UserRole.SUPERVISOR;
        break;
      default:
        this.userRole = UserRole.INTERN;
    }
  }

  private setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
