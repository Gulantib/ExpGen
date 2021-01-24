import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	//@Render('index')
	root(@Res() res) {
		res.sendFile(process.cwd() + '/src/index.html');
	}
}
