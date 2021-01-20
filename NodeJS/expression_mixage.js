const fs = require('fs');


(async () => {
	await fs.readFile('expression.txt', 'utf8', function(err, data) {
		var expressions = data.split('\n');

		var nouvelle_expression, expression_random, expression_courante;

		var expressions_shuffle_global = expressions;
		for (let i = expressions_shuffle_global.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[expressions_shuffle_global[i], expressions_shuffle_global[j]] = [expressions_shuffle_global[j], expressions_shuffle_global[i]];
		}
		expressions_shuffle_global.forEach(expression_random => {
			if (nouvelle_expression != undefined) return;

			var expressions_shuffle = expressions;
  			expressions_shuffle.splice(expressions_shuffle.indexOf(expression_random), 1);
			for (let i = expressions_shuffle.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[expressions_shuffle[i], expressions_shuffle[j]] = [expressions_shuffle[j], expressions_shuffle[i]];
			}

			var expression_random = expressions_shuffle.pop();
			var expression_random_split = expression_random.split(' ');
			expressions_shuffle.forEach(expression_courante => {
				if (nouvelle_expression != undefined) return;
				var expression_courante_split = expression_courante.split(' ');
				if (expression_courante_split[0] == expression_random_split[expression_random_split.length - 1]) {  //2
					console.log(expression_random);
					console.log(expression_courante);
					nouvelle_expression = expression_random_split.splice(0, expression_random_split.length - 1).concat(expression_courante_split.splice(0, expression_courante_split.length)).join(' '); //1 -1
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

		console.log(nouvelle_expression);


	}); 
})();