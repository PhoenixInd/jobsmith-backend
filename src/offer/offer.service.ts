import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from 'src/prisma.service';
import { JobService } from 'src/job/job.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService, private jobService: JobService){}
  async create(createOfferDto: CreateOfferDto) {
    const job = await this.jobService.findOne(createOfferDto.jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.prisma.offer.create({data: createOfferDto});
  }

  async findAll() {
    return this.prisma.offer.findMany();
  }

  async findOne(id: number) {
    const offer = await this.prisma.offer.findUnique({where: {id}});
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    await this.findOne(id);
    return this.prisma.offer.update({where: {id}, data: updateOfferDto});
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.offer.delete({where: {id}});
  }
}
