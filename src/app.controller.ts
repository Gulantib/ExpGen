import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {

	@Get()
	//@Render('index')
	root(@Res() res) {
		res.sendFile(process.cwd() + '/src/index.html');
	}

	@Get('/:lang')
	rootLang(@Res() res) {
		res.sendFile(process.cwd() + '/src/index.html');
	}
}
