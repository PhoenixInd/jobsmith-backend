import { Test, TestingModule } from '@nestjs/testing';
import { JobSkillController } from './job_skill.controller';
import { JobSkillService } from './job_skill.service';

describe('JobSkillController', () => {
  let controller: JobSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSkillController],
      providers: [JobSkillService],
    }).compile();

    controller = module.get<JobSkillController>(JobSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
