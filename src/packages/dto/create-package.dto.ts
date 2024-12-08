import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsOptional()
  desc: string;
}
