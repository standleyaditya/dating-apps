import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Swipe {
  @PrimaryGeneratedColumn()
  swipe_id: number;

  @Column()
  action: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Profile, (profile) => profile.swipes)
  profile: Profile;

  // Many-to-one relationship where this swipe is linked to the profile that did the swiping
  @ManyToOne(() => Profile, (profile) => profile.swipedProfiles)
  swiped: Profile; // This is the profile that swiped
}
