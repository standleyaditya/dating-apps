import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Swipe {
  @PrimaryGeneratedColumn()
  swipe_id: number;

  @Column({ nullable: true })
  action: string;

  @UpdateDateColumn({ nullable: true })
  swiped_at: Date;

  @ManyToOne(() => Profile, (profile) => profile.swipes)
  @JoinColumn([{ referencedColumnName: 'profile_id' }])
  profile: Profile;

  // Many-to-one relationship where this swipe is linked to the profile that did the swiping
  @ManyToOne(() => Profile, (profile) => profile.swipedProfiles)
  @JoinColumn([{ referencedColumnName: 'profile_id' }])
  swiped: Profile; // This is the profile that swiped
}
