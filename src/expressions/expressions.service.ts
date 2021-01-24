import { Injectable } from '@nestjs/common';
import { Expression } from './expression.model';
const fs = require('fs');


@Injectable()
export class ExpressionsService {
	static expressions: Expression[] = [];

	constructor() {
		this.loadExpressions();
	}

	findAll() {
		return ExpressionsService.expressions;
	}

	findOne(id: string) {
		return ExpressionsService.expressions.find(element => { return element.id == id });
	}

	getRandom() {
		var token = Math.floor(Math.random() * ExpressionsService.expressions.length);
		return ExpressionsService.expressions[token];
	}

	searchValue(value: string) {
		return ExpressionsService.expressions.filter(element => { 
			return (element.content.includes(value) 
				|| element.definition_list.reduce((accumulator, currentValue) => { return accumulator || currentValue.includes(value) }, false))
		});
	}

	loadExpressions() {
		var dataFile = fs.readFileSync('src/expressions/expressions.json','utf8');
		var expressionsDataFile = JSON.parse(dataFile);
		ExpressionsService.expressions = [];
		expressionsDataFile.forEach(element => {
			ExpressionsService.expressions.push(new Expression(element.id, element.content, element.definition_list));
		});
		return {information: 'Expressions loaded'}
	}

	addExpression(content: string, definition_list: string[]) {
		var id = ExpressionsService.expressions.length.toString();
		ExpressionsService.expressions.push(new Expression(id, content, definition_list));
		return this.findOne(id);
	}
}
