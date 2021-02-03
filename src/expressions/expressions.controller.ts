import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ExpressionsService } from './expressions.service';

@Controller('api')
export class ExpressionsController {
	constructor(private readonly expressionsService: ExpressionsService) {}

	@Get('/:lang/expressions/item')
	findAll(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.findAll(lang);
	}

	@Get('/:lang/expressions/item/:id')
	findOne(
		@Param('lang') lang: string,
		@Param('id') id: string
	) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.findOne(lang, id);
	}

	@Get('/:lang/expressions/random')
	getRandom(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.getRandom(lang);
	}

	@Get('/:lang/expressions/search/:value')
	searchValue(
		@Param('lang') lang: string,
		@Param('value') value: string
	) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.searchValue(lang, value);
	}

	@Get('/:lang/expressions/load')
	loadExpressions(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.loadExpressions(lang);
	}

	@Post('/:lang/expressions/item')
	addExpression(
		@Param('lang') lang: string,
		@Body('content') content: string,
		@Body('definition_list') definition_list: string[]
	) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.expressionsService.addExpression(lang, content, definition_list);
	}
}
