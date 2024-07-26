import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'Offer created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Offer already exists' })
  @UseGuards(AuthGuard)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Offers retrieved' })
  findAll() {
    return this.offerService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an offer' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an offer' })
  @ApiResponse({ status: 200, description: 'Offer updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiResponse({ status: 200, description: 'Offer deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
