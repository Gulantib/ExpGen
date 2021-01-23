import { Controller, Get, Render, Res, Param, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	//@Render('index')
	root(@Res() res) {
		res.sendFile(process.cwd() + '\\src\\index.html');
	}

	/*@Get(':id')
	rootParam(@Res() res, @Param('id') id: string) {
		res.sendFile(process.cwd() + '\\src\\index.html');
	}*/

	@Get('/api')
	getExpression() {
		return this.appService.getExpression();
	}

	@Get('/api/generate')
	generateExpression() {
		return this.appService.generateExpression();
	}

	@Get('/api/refresh')
	refreshExpression() {
		return this.appService.refreshExpression();
	}

	@Get('/api/refresh/:number')
	refreshExpressionParam(@Res() res, @Param('number') number: string) {
		return this.appService.refreshExpressionParam(parseInt(number));
	}	
}
