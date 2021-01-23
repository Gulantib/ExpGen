import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpressionsModule } from './expressions/expressions.module';

@Module({
  imports: [ExpressionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
