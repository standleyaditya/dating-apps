// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePremiumDto } from './create-premium.dto';

import { IsNotEmpty } from 'class-validator';

export class UpdatePremiumDto {
  @IsNotEmpty({ message: 'status id is required' })
  status: string;
}
