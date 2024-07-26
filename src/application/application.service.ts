import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma.service';
import { OfferService } from 'src/offer/offer.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService, private offerService: OfferService){}
  async create(createApplicationDto: CreateApplicationDto) {
    const offer = await this.offerService.findOne(createApplicationDto.offerId);
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return this.prisma.application.create({data: createApplicationDto});
  }

  async findAll() {
    return this.prisma.application.findMany({
      include: {
        offer: {
          include: {
            Job: true,
          },
        },
        status: true,
        ranking: {
          include: {
            Criteria: true,
          },
        },
        selectionTag: true,
      },
    });
  }

  async findOne(id: number) {
    const application = await this.prisma.application.findUnique({ where: { id },
      include: {
        offer: {
          include: {
            Job: true,
          },
        },
        status: true,
        ranking: {
          include: {
            Criteria: true,
          },
        },
        selectionTag: true,
      }, });
    if (!application) {
        throw new NotFoundException('Application not found');
    }
    return this.prisma.application.findUnique({ where: { id } });
  }

  async findUserApplicationsNotFinished(userId: number) {
    const userApplications = await this.prisma.application.findMany({
      where: { userId, statusId: { not: 1 } },
      include: {
        offer: {
          include: {
            Job: true,
          },
        },
        status: true,
        ranking: {
          include: {
            Criteria: true,
          },
        },
        selectionTag: true,
      },
    });
    
    if (userApplications.length === 0) {
      throw new NotFoundException(`No applications found for user with id ${userId}`);
    }
    
    return userApplications;
  }

  async findUserApplications(userId: number) {
    const userapplications = await this.prisma.application.findMany({
      where: { userId },
      include: {
        offer: {
          include: {
            Job: true,
          },
        },
        status: true,
        ranking: {
          include: {
            Criteria: true,
          },
        },
        selectionTag: true,
      },
    });
    
    if (userapplications.length === 0) {
      throw new NotFoundException(`No applications found for user with id ${userId}`);
    }
    
    return userapplications;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);
    return this.prisma.application.update({where: {id}, data: updateApplicationDto, 
      include: {
        offer: {
          include: {
            Job: true,
          },
        },
        status: true,
        ranking: {
          include: {
            Criteria: true,
          },
        },
        selectionTag: true,
      },});
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.application.delete({where: {id}});
  }
}
