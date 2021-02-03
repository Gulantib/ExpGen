import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ExpressionsService } from 'src/expressions/expressions.service';
import { MixedExpressionsService } from './mixed_expressions.service';

@Controller('api')
export class MixedExpressionsController {
	constructor(private readonly mixedExpressionsService: MixedExpressionsService) {}

	@Get('/:lang/mixed_expressions/item')
	findAll(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.findAll(lang);
	}

	@Get('/:lang/mixed_expressions/item/:id')
	findOne(
		@Param('lang') lang: string,
		@Param('id') id: string
	) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.findOne(lang, id);
	}

	@Get('/:lang/mixed_expressions/random')
	getRandom(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.getRandom(lang);
	}

	@Get('/:lang/mixed_expressions/search/:value')
	searchValue(
		@Param('lang') lang: string,
		@Param('value') value: string
	) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.searchValue(lang, value);
	}

	@Get('/:lang/mixed_expressions/load')
	loadExpressions(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.loadExpressions(lang);
	}

	@Get('/:lang/mixed_expressions/generate')
	generateExpressions(@Param('lang') lang: string) {
		if (!ExpressionsService.isLang(lang))
			return {information: 'Language unsupported'}
		return this.mixedExpressionsService.generateExpressions(lang);
	}

}
