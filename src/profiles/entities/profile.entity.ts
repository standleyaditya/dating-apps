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
import { User } from '../../users/entities/user.entity';
import { Swipe } from 'src/swipes/entities/swipe.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  fullname: string;

  @Column()
  bio: string;

  @Column({ default: 10 })
  swipe_count: number;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_swiped_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // One-to-One relation with User
  @OneToOne(() => User, (user) => user.profile)
  user: User;

  // One-to-many relationship with Swipe: One profile can have many swipes
  @OneToMany(() => Swipe, (swipe) => swipe.profile)
  swipes: Swipe[];

  // One-to-many relationship where this profile is the "swiped" profile (the profile that swiped)
  @OneToMany(() => Swipe, (swipe) => swipe.swiped)
  swipedProfiles: Swipe[];
}
