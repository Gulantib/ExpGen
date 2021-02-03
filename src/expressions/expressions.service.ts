import { Injectable } from '@nestjs/common';
import { Expression } from './expression.model';
const fs = require('fs');


@Injectable()
export class ExpressionsService {
	static expressions: Expression[][] = [];
	static langs: string[] = ['fr','uk'];

	constructor() {
		ExpressionsService.langs.forEach(lang => {
			this.loadExpressions(lang);
		});
	}

	static isLang(lang: string) {
		return ExpressionsService.langs.find(element => { return ( element == lang ); });
	}

	findAll(lang: string) {
		return ExpressionsService.expressions[lang];
	}

	findOne(lang: string, id: string) {
		return ExpressionsService.expressions[lang].find(element => { return element.id == id });
	}

	getRandom(lang: string) {
		var token = Math.floor(Math.random() * ExpressionsService.expressions[lang].length);
		return ExpressionsService.expressions[lang][token];
	}

	searchValue(lang: string, value: string) {
		return ExpressionsService.expressions[lang].filter(element => { 
			return (element.content.includes(value) 
				|| element.definition_list.reduce((accumulator, currentValue) => { return accumulator || currentValue.includes(value) }, false))
		});
	}

	loadExpressions(lang: string) {
		var dataFile = fs.readFileSync('src/expressions/expressions_' + lang + '.json','utf8');
		var expressionsDataFile = JSON.parse(dataFile);
		ExpressionsService.expressions[lang] = [];
		expressionsDataFile.forEach(element => {
			ExpressionsService.expressions[lang].push(new Expression(element.id, element.content, element.definition_list));
		});
		return { information: 'Expressions loaded' }
	}

	addExpression(lang: string, content: string, definition_list: string[]) {
		var id = ExpressionsService.expressions[lang].length.toString();
		ExpressionsService.expressions[lang].push(new Expression(id, content, definition_list));
		return this.findOne(lang, id);
	}
}
