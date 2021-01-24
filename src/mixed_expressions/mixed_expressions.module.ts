import { Module } from '@nestjs/common';
import { MixedExpressionsController } from './mixed_expressions.controller';
import { MixedExpressionsService } from './mixed_expressions.service';

@Module({
  imports: [],
  controllers: [MixedExpressionsController],
  providers: [MixedExpressionsService],
})
export class MixedExpressionsModule {}
