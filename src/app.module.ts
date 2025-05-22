import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoffeeModule, PrismaModule],
})
export class AppModule {}
