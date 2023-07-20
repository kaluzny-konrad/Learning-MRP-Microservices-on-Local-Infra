import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('info')
  findWithInfo(@Req() request: Request): string {
    return `Cats route with request info: ${request.url}`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('any/:id')
  findOneAny(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }

  @Get('exact/:id')
  findOneExact(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Get('asyncPromise')
  async findAsyncPromise(): Promise<string> {
    return 'This action returns async promise';
  }

  @Get('asyncObservable')
  findObservable(): Observable<any[]> {
    return of([]);
  }

  @Post('catAsDto')
  async createCatAsDto(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat with name: ${createCatDto.name}`;
  }
}
