import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ConfigService],
    }).compile();

    controller = module.get<UserController>(UserController);
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
