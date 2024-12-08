import { Premium } from 'src/premiums/entities/premium.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  desc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Many-to-many relationship with Premium
  @OneToMany(() => Premium, (premium) => premium.packages)
  premiums: Premium[];
}
