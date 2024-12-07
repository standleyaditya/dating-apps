import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsUUID() // Validates that the value is a valid UUID
  @IsNotEmpty() // If the foreign key is optional
  user_id: string; // Foreign key referencing the User entity

  @IsNotEmpty({ message: 'Fullname is required' })
  fullname: string;

  @IsNotEmpty({ message: 'Bio is required' })
  bio: string;

  @IsOptional()
  swipe_count: number;

  @IsOptional()
  last_swiped_at: Date;

  @IsOptional()
  age: number;
}
