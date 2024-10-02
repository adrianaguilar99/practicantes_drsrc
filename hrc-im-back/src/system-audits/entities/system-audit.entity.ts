import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audits')
export class SystemAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: false })
  user: { id: string; fullName: string; role: string };

  @Column({ type: 'varchar', length: 50, nullable: false })
  action: string;

  @Column({ type: 'json', nullable: false })
  entityAffected: { id: string; name: string };

  @Column({ type: 'varchar', length: 20, nullable: false })
  status: string;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @Column({ type: 'timestamp' })
  auditDate: Date;

  @BeforeInsert()
  setAuditDate() {
    this.auditDate = new Date();
  }
}
