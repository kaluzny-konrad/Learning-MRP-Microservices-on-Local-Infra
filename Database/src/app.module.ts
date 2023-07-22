import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CatsModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
