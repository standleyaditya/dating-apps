import { Injectable } from '@nestjs/common';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';

@Injectable()
export class PremiumsService {
  create(createPremiumDto: CreatePremiumDto) {
    return 'This action adds a new premium';
  }

  findAll() {
    return `This action returns all premiums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} premium`;
  }

  update(id: number, updatePremiumDto: UpdatePremiumDto) {
    return `This action updates a #${id} premium`;
  }

  remove(id: number) {
    return `This action removes a #${id} premium`;
  }
}
