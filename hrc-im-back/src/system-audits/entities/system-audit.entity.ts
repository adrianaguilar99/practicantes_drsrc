import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audits')
export class SystemAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'responsible',
    type: 'json',
    nullable: false,
  })
  responsible: { id: string; fullName: string; role: string };

  @Column({
    name: 'action',
    type: 'varchar',
    nullable: false,
  })
  action: string;

  @Column({
    name: 'entity_affected',
    type: 'json',
    nullable: false,
  })
  entityAffected: { id: string; data: string };

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
  })
  status: string;

  @Column({
    name: 'error_message',
    type: 'text',
    nullable: true,
  })
  errorMessage: string;

  @Column({
    name: 'audit_date',
    type: 'timestamp',
  })
  auditDate: Date;

  @BeforeInsert()
  setAuditDate() {
    this.auditDate = new Date();
  }
}
