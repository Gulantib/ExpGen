import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpressionsModule } from './expressions/expressions.module';
import { MixedExpressionsModule } from './mixed_expressions/mixed_expressions.module';

@Module({
  imports: [ExpressionsModule, MixedExpressionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
