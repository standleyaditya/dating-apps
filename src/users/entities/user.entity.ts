import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // One-to-One relation with Profile
  @OneToOne(() => Profile, (profile) => profile.user, { nullable: true })
  profile: Profile;

  // Many-to-many relationship with PremiumPackage
  @OneToMany(() => Premium, (premium) => premium.user, { nullable: true })
  premium: Premium[];
}
