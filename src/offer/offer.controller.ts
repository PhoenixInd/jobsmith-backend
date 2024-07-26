import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
