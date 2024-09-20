import { UserRoles } from 'src/common/enums/userRoles.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: UserRoles, nullable: false })
  userRol: string;

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
  setCreation() {
    this.email = this.email.toLowerCase();
    this.setUserRole();
    this.setCreationDate();
  }

  private setUserRole() {
    const domain = this.email.split('@')[1];
    switch (domain) {
      case 'google.com':
        this.userRol = UserRoles.ADMINISTRATOR;
        break;
      case 'facebook.com':
        this.userRol = UserRoles.SUPERVISOR;
        break;
      default:
        this.userRol = UserRoles.INTERN;
    }
  }

  private setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
