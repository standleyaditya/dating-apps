import { IsNotEmpty } from 'class-validator';

export class CreateSwipeDto {
  @IsNotEmpty({ message: 'profile id is required' })
  profile_id: number;
}
