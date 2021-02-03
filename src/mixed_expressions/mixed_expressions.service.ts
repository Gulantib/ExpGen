import { Injectable } from '@nestjs/common';
import { ExpressionsService } from 'src/expressions/expressions.service';
import { MixedExpression } from './mixed_expressions.model';
const fs = require('fs');


@Injectable()
export class MixedExpressionsService {
	mixedExpressions: MixedExpression[][] = [];

	constructor() {
		ExpressionsService.langs.forEach(lang => {
			if (fs.existsSync('src/mixed_expressions/mixed_expressions_' + lang + '.json'))
				this.loadExpressions(lang);
			else
				this.generateExpressions(lang);
		});
	}

	findAll(lang: string) {
		return this.mixedExpressions[lang];
	}

	findOne(lang: string, id: string) {
		return this.mixedExpressions[lang].find(element => { return element.id == id });
	}

	getRandom(lang: string) {
		var token = Math.floor(Math.random() * this.mixedExpressions[lang].length);
		return this.mixedExpressions[lang][token];
	}

	searchValue(lang: string, value: string) {
		return this.mixedExpressions[lang].filter(element => { return element.content.includes(value) });
	}

	loadExpressions(lang: string) {
		var dataFile = fs.readFileSync('src/mixed_expressions/mixed_expressions_' + lang + '.json','utf8');
		var expressionsDataFile = JSON.parse(dataFile);
		this.mixedExpressions[lang] = [];
		expressionsDataFile.forEach(element => {
			this.mixedExpressions[lang].push(new MixedExpression(element.id, element.content, element.expression_list));
		});
		return { information: 'Mixed expressions loaded', mixed_expressions_count: this.mixedExpressions[lang].length }
	}

	generateExpressions(lang: string) {
		if (!fs.existsSync('src/mixed_expressions/mixed_expressions_' + lang + '.json') || fs.statSync('src/mixed_expressions/mixed_expressions_' + lang + '.json').mtime > fs.statSync('src/mixed_expressions/mixed_expressions_' + lang + '.json').mtime) {
			var new_mixed_expression_list_count = 0;
			this.mixedExpressions[lang] = [];
			
			//get list A 
			var expression_list_A = ExpressionsService.expressions[lang];

			//for item list A
			expression_list_A.forEach(expression_A => {
				//get list B
				var expression_list_B = ExpressionsService.expressions[lang];

				//for item list B
				expression_list_B.forEach(expression_B => {
					//stop case
					if (expression_A.content == expression_B.content) return;

					//split expression
					var expression_A_split = expression_A.content.split(' ');
					var expression_B_split = expression_B.content.split(' ');

					//for each variant
					for (let type = 0; type < 3; ++type) {
						var variant_A = Math.floor(type / 2);
						var variant_B = type % 2;

						//filter (minimal size)
						if ((variant_A >= 1 && expression_A_split.length <= 4) || (variant_B >= 1 && expression_B_split.length <= 4))
							continue

						//succes
						if (expression_A_split[expression_A_split.length - (1 + variant_A)].trim() == expression_B_split[variant_B].trim()) {
							var new_mixed_expression_content = expression_A_split.splice(0, expression_A_split.length - (1 + variant_A)).concat(expression_B_split.splice(variant_B, expression_B_split.length - variant_B)).join(' ');
							if (!ExpressionsService.expressions[lang].find(element => { return element.content == new_mixed_expression_content })
								&& !this.mixedExpressions[lang].find(element => { return element.content == new_mixed_expression_content })) {
									var new_mixed_expression = new MixedExpression((new_mixed_expression_list_count++).toString(), new_mixed_expression_content, [expression_A,expression_B])
									this.mixedExpressions[lang].push(new_mixed_expression);
							}

						}
					}
				});
			});

			//create json string
			var dataFile = "[\n";
			this.mixedExpressions[lang].forEach(element => { 
				dataFile += "\t" + JSON.stringify(element) + ",\n";
			})
			dataFile = dataFile.substring(0, dataFile.length-2) + "\n";
			dataFile += "]";
		
			//write file
			fs.writeFileSync('src/mixed_expressions/mixed_expressions_' + lang + '.json', dataFile);

			return { information: 'Mixed expressions generated', mixed_expressions_count: this.mixedExpressions[lang].length };
		}

		return { information: 'Refresh unnecessary', mixed_expressions_count: this.mixedExpressions[lang].length }
	}
}
