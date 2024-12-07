import { Package } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Premium {
  @PrimaryGeneratedColumn()
  premium_id: number;

  @CreateDateColumn()
  created_at: Date;

  // Many-to-many relationship with User
  @ManyToMany(() => User, (user) => user.premium)
  users: User[];

  @ManyToMany(() => Package, (packageEntity) => packageEntity.premiums)
  @JoinTable() // This will create a join table to manage the many-to-many relationship
  packages: Package[];
}
