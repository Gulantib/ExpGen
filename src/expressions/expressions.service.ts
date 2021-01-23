import { Injectable } from '@nestjs/common';
import { Expression } from './expression.model';
const fs = require('fs');


@Injectable()
export class ExpressionsService {
	expressions: Expression[] = [];

	constructor() {
		this.loadExpressions();
	}

	findAll() {
		return this.expressions;
	}

	findOne(id: string) {
		return this.expressions.find(element => { return element.id == id });
	}

	getRandom() {
		var token = Math.floor(Math.random() * this.expressions.length);
		return this.expressions[token];
	}

	searchValue(value: string) {
		return this.expressions.filter(element => { return (element.content.includes(value) || element.definition_list.reduce((accumulator, currentValue) => { return accumulator || currentValue.includes(value) }, false)) });
	}

	loadExpressions() {
		var dataFile = fs.readFileSync('src/expressions/expressions.txt','utf8');
		var expressionsDataFile = JSON.parse(dataFile);
		expressionsDataFile.forEach(element => {
			this.expressions.push(new Expression(element.id, element.content, element.definition_list));
		});
		return {information: 'Expressions loaded'}
	}

	addExpression(content: string, definition_list: string[]) {
		var id = this.expressions.length.toString();
		this.expressions.push(new Expression(id, content, definition_list));
		return this.findOne(id);
	}
}
