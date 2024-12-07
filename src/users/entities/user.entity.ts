import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Premium } from 'src/premiums/entities/premium.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  premium_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // One-to-One relation with Profile
  @OneToOne(() => Profile, (profile) => profile.user, { nullable: true })
  @JoinColumn() // Indicates that this is the "owning" side of the relationship
  profile: Profile;

  // Many-to-many relationship with PremiumPackage
  @ManyToMany(() => Premium, (premium) => premium.users, { nullable: true })
  @JoinTable() // This will create a join table to manage the many-to-many relationship
  premium: Premium[];
}
