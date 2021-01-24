import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MixedExpressionsService } from './mixed_expressions.service';

@Controller('api/mixed_expressions')
export class MixedExpressionsController {
	constructor(private readonly mixedExpressionsService: MixedExpressionsService) {}

	@Get('/item')
	findAll() {
		return this.mixedExpressionsService.findAll();
	}

	@Get('/item/:id')
	findOne(@Param('id') id: string) {
		return this.mixedExpressionsService.findOne(id);
	}

	@Get('/random')
	getRandom() {
		return this.mixedExpressionsService.getRandom();
	}

	@Get('/search/:value')
	searchValue(@Param('value') value: string) {
		return this.mixedExpressionsService.searchValue(value);
	}

	@Get('/load')
	loadExpressions() {
		return this.mixedExpressionsService.loadExpressions();
	}

	@Get('/generate')
	generateExpressions() {
		return this.mixedExpressionsService.generateExpressions();
	}

}
