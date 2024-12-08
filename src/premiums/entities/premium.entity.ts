import { Package } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  Column,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Premium {
  @PrimaryGeneratedColumn()
  premium_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  subscriptionDate: Date;

  @Column({ default: 'active' })
  status: string;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // @Column()
  // user_id: string;

  // @Column()
  // package_id: number;

  // Many-to-many relationship with User
  @ManyToOne(() => User, (user) => user.premium)
  @JoinTable()
  user: User;

  @ManyToOne(() => Package, (packages) => packages.premiums)
  @JoinTable() // This will create a join table to manage the many-to-many relationship
  packages: Package;
}
