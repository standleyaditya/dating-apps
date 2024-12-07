import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiumsService } from './premiums.service';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';

@Controller('premiums')
export class PremiumsController {
  constructor(private readonly premiumsService: PremiumsService) {}

  @Post()
  create(@Body() createPremiumDto: CreatePremiumDto) {
    return this.premiumsService.create(createPremiumDto);
  }

  @Get()
  findAll() {
    return this.premiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premiumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremiumDto: UpdatePremiumDto) {
    return this.premiumsService.update(+id, updatePremiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premiumsService.remove(+id);
  }
}
