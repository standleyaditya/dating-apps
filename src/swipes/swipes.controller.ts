import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SwipesService } from './swipes.service';
import { CreateSwipeDto } from './dto/create-swipe.dto';
import { UpdateSwipeDto } from './dto/update-swipe.dto';

@Controller('swipes')
export class SwipesController {
  constructor(private readonly swipesService: SwipesService) {}

  @Post()
  create(@Body() createSwipeDto: CreateSwipeDto) {
    return this.swipesService.create(createSwipeDto);
  }

  @Get()
  findAll() {
    return this.swipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.swipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwipeDto: UpdateSwipeDto) {
    return this.swipesService.update(+id, updateSwipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swipesService.remove(+id);
  }
}
