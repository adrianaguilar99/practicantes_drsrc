import { ApiProperty } from '@nestjs/swagger';
import { Intern } from 'src/interns/entities/intern.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';

export class CreateInternCommentDto {
  @ApiProperty({
    example:
      'Sit consectetur fugiat minim mollit aliqua sit fugiat laboris voluptate ut deserunt elit et. Duis deserunt ullamco dolor adipisicing in aute fugiat pariatur et quis.',
    description: 'The content of the comment written by the supervisor.',
    nullable: false,
  })
  postedComment: string;

  @ApiProperty({
    type: () => Supervisor,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description:
      'The supervisor who wrote the comment, identified by Supervisor ID (UUID).',
    nullable: false,
  })
  supervisorId: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description:
      'The intern to whom the comment is related, identified by Intern ID (UUID).',
    nullable: false,
  })
  internId: string;
}
