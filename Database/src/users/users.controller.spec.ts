import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ConfigService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have data in configService', () => {
    expect(configService.get('PASSWORD_COMMON_PEPPER')).toBeDefined();
    expect(configService.get('PASSWORD_SHA_KEY')).toBeDefined();
  });
});
