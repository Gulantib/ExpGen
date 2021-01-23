import { Injectable } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class AppService {
	getExpression() {
		//lecture de fichier
		var expressions = fs.readFileSync('src/mixed_expression_2.txt','utf8').split('\n');

		//choix de la phrase
		var tirage = Math.floor(Math.random() * expressions.length);
		var nouvelle_expression = expressions[tirage];

		nouvelle_expression = nouvelle_expression ? nouvelle_expression.replace(/\r/g, '') : "";
		return {value: nouvelle_expression};
	}

	generateExpression() {
		var nouvelle_expression;

		//lecture de fichier
		var expressions = fs.readFileSync('src/expression.txt','utf8').split('\n');

		//initialisation des données
		var jeton = Math.floor(Math.random() * 4);
		var variante_A = Math.floor(jeton / 2);
		var variante_B = jeton % 2;

		//mélanger les expressions
		var expressions_shuffle_global = expressions;

		//filter fortement expressions (taille minimale)
		if (variante_B >= 1)
			expressions_shuffle_global = expressions_shuffle_global.filter(expression => expression.split(' ').length > 4);

		for (let i = expressions_shuffle_global.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[expressions_shuffle_global[i], expressions_shuffle_global[j]] = [expressions_shuffle_global[j], expressions_shuffle_global[i]];
		}

		//traiter les expressions
		expressions_shuffle_global.forEach(expression_random => {
			//cas d'arrêt
			if (nouvelle_expression != undefined) return;

			//filter expressions (sans expression_random)
			var expressions_shuffle = expressions;
			expressions_shuffle.splice(expressions_shuffle.indexOf(expression_random), 1);

			//filter fortement expressions (taille minimale)
			if (variante_A >= 1)
				expressions_shuffle = expressions_shuffle.filter(expression => expression.split(' ').length > 4);

			//mélanger les expressions
			for (let i = expressions_shuffle.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[expressions_shuffle[i], expressions_shuffle[j]] = [expressions_shuffle[j], expressions_shuffle[i]];
			}

			//traitement de l'expression choisi aléatoirement
			var expression_random_split = expression_random.split(' ');

			//traiter les expressions
			expressions_shuffle.forEach(expression_courante => {
				//cas d'arrêt
				if (nouvelle_expression != undefined) return;

				var expression_courante_split = expression_courante.split(' ');

				//cas de succès
				if (expression_courante_split[variante_A] == expression_random_split[expression_random_split.length - (1 + variante_B)]) {
					console.log(expression_random);
					console.log(expression_courante);
					nouvelle_expression = expression_random_split.splice(0, expression_random_split.length - (1 + variante_A)).concat(expression_courante_split.splice(variante_B, expression_courante_split.length - variante_B)).join(' ');
					
					//vérification de la possible existance de l'expression
					if (nouvelle_expression == expression_random || nouvelle_expression == expression_courante) {

						console.log('bad_nouvelle_expression');
						console.log(nouvelle_expression);
						nouvelle_expression = undefined;
					}
					else {
						console.log('nouvelle_expression_ok');
						console.log(nouvelle_expression);
					}
				}
			});
		});
		nouvelle_expression = nouvelle_expression ? nouvelle_expression.replace(/\r/g, '') : "";
		return {value: nouvelle_expression};
	}

	refreshExpression() {
		if (fs.statSync('src/expression.txt').mtime > fs.statSync('src/mixed_expression_2.txt').mtime) {
			var new_mixed_expression_list = [];

			//lecture de fichier
			var expression_list = fs.readFileSync('src/expression.txt','utf8').split('\n');

			//choisir les expressions
			var expression_list_A = expression_list;

			//traiter les expressions
			expression_list_A.forEach(expression_A => {
				//choisir les expressions
				var expression_list_B = expression_list;

				//traitement de l'expression choisi aléatoirement
				var expression_A_split = expression_A.split(' ');

				//traiter les expressions
				expression_list_B.forEach(expression_B => {
					//cas d'arrêt
					if (expression_A == expression_B) return;

					//traitement de l'expression choisi aléatoirement
					var expression_B_split = expression_B.split(' ');

					//liste des variantes
					for (let type = 0; type < 3; ++type) {
						//calcul des variantes
						var variant_A = Math.floor(type / 2);
						var variant_B = type % 2;

						//filter fortement expressions (taille minimale)
						if ((variant_A >= 1 && expression_A_split.length <= 4) || (variant_B >= 1 && expression_B_split.length <= 4))
							continue

						//cas de succès
						if (expression_A_split[expression_A_split.length - (1 + variant_A)].trim() == expression_B_split[variant_B].trim()) {
							var new_mixed_expression = expression_A_split.splice(0, expression_A_split.length - (1 + variant_A)).concat(expression_B_split.splice(variant_B, expression_B_split.length - variant_B)).join(' ');
							if (!expression_list.includes(new_mixed_expression) && !new_mixed_expression_list.includes(new_mixed_expression))
								new_mixed_expression_list.push(new_mixed_expression);
						}
					}
				});
			});

			fs.writeFileSync('src/mixed_expression_2	.txt', new_mixed_expression_list.join('\n'));

			return {mixed_expressions_number: new_mixed_expression_list.length};
		}

		return {information: 'Refresh unnecessary'}
	}

	refreshExpressionParam(number) {
		if (number <= 5 && (!fs.existsSync('src/mixed_expression_' + number + '.txt') || fs.statSync('src/expression.txt').mtime > fs.statSync('src/mixed_expression_' + number + '.txt').mtime)) {
			var new_mixed_expression_list = [];

			//lecture de fichier
			var expression_list = fs.readFileSync('src/expression.txt','utf8').split('\n');

			//choisir les expressions
			var expression_list_A = expression_list;
			
			var expression_list_B;
			if ((number-1) == 1){
				expression_list_B = expression_list;
			}
			else {
				if (!fs.existsSync('src/mixed_expression_' + (number-1) + '.txt')) {
					this.refreshExpressionParam(number-1)
				}
				expression_list_B = fs.readFileSync('src/mixed_expression_' + (number-1) + '.txt','utf8').split('\n');
			}

			//traiter les expressions
			expression_list_A.forEach(expression_A => {
				//traitement de l'expression choisi aléatoirement
				var expression_A_split = expression_A.split(' ');

				//traiter les expressions
				expression_list_B.forEach(expression_B => {
					//cas d'arrêt
					if (expression_A == expression_B) return;

					//traitement de l'expression choisi aléatoirement
					var expression_B_split = expression_B.split(' ');

					//liste des variantes
					for (let type = 0; type < 3; ++type) {
						//calcul des variantes
						var variant_A = Math.floor(type / 2);
						var variant_B = type % 2;

						//filter fortement expressions (taille minimale)
						if ((variant_A >= 1 && expression_A_split.length <= 4) || (variant_B >= 1 && expression_B_split.length <= 4))
							continue

						//cas de succès
						if (expression_A_split[expression_A_split.length - (1 + variant_A)].trim() == expression_B_split[variant_B].trim()) {
							var new_mixed_expression = expression_A_split.splice(0, expression_A_split.length - (1 + variant_A)).concat(expression_B_split.splice(variant_B, expression_B_split.length - variant_B)).join(' ');
							if (!expression_list.includes(new_mixed_expression) && !new_mixed_expression_list.includes(new_mixed_expression))
								new_mixed_expression_list.push(new_mixed_expression);
						}
					}
				});
			});

			fs.writeFileSync('src/mixed_expression_' + number + '.txt', new_mixed_expression_list.join('\n'));

			return {mixed_expressions_number: new_mixed_expression_list.length};
		}

		return {information: 'Refresh unnecessary'}
	}
}
