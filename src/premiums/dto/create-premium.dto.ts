import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePremiumDto {
  @IsNotEmpty({ message: 'user id is required' })
  @IsUUID()
  user_id: string;

  @IsNotEmpty({ message: 'package id is required' })
  package_id: number;
}
