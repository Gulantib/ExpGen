import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ExpressionsService } from './expressions.service';

@Controller('api/expressions')
export class ExpressionsController {
	constructor(private readonly expressionsService: ExpressionsService) {}

	@Get('/item')
	findAll() {
		return this.expressionsService.findAll();
	}

	@Get('/item/:id')
	findOne(@Param('id') id: string) {
		return this.expressionsService.findOne(id);
	}

	@Get('/random')
	getRandom() {
		return this.expressionsService.getRandom();
	}

	@Get('/search/:value')
	searchValue(@Param('value') value: string) {
		return this.expressionsService.searchValue(value);
	}

	@Get('/load')
	loadExpressions() {
		return this.expressionsService.loadExpressions();
	}

	@Post('/item')
	addExpression(
		@Body('content') content: string,
		@Body('definition_list') definition_list: string[]
	) {
		return this.expressionsService.addExpression(content, definition_list);
	}
}
