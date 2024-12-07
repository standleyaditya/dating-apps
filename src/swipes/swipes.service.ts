import { Injectable } from '@nestjs/common';
import { CreateSwipeDto } from './dto/create-swipe.dto';
import { UpdateSwipeDto } from './dto/update-swipe.dto';

@Injectable()
export class SwipesService {
  create(createSwipeDto: CreateSwipeDto) {
    return 'This action adds a new swipe';
  }

  findAll() {
    return `This action returns all swipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} swipe`;
  }

  update(id: number, updateSwipeDto: UpdateSwipeDto) {
    return `This action updates a #${id} swipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} swipe`;
  }
}
