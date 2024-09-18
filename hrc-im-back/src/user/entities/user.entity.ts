import { UserRoles } from 'src/common/enums/userRoles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: UserRoles, unique: false, nullable: false })
  userRoles: string;

  @Column({
    type: 'timestamp',
    unique: false,
    nullable: false,
  })
  createdAt: string;

  //   @Column({
  //     type: 'timestamp with local time zone',
  //     unique: false,
  //     nullable: false,
  //   })
  //   updatedAt: string;
}
