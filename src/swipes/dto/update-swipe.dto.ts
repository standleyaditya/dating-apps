import { IsNotEmpty } from 'class-validator';

export class UpdateSwipeDto {
  @IsNotEmpty({ message: 'profile id is required' })
  action: string;
}
