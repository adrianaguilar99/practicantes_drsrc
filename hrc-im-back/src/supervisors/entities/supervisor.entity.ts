import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/departments/entities/department.entity';
import { InternComment } from 'src/intern-comments/entities/intern-comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('supervisors')
export class Supervisor {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Supervisor ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '9988774455',
    description: "Supervisor's cell phone.",
    nullable: false,
  })
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    type: () => Department,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Department ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Department, (department) => department.supervisors, {
    nullable: false,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => InternComment, (internComments) => internComments.supervisor)
  internComents: InternComment[];

  @ApiProperty({
    type: () => User,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID to make the relationship.',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.supervisor, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
