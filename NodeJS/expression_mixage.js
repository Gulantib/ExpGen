const fs = require('fs');


(async () => {
	//lecture de fichier
	await fs.readFile('expression.txt', 'utf8', function(err, data) {
		//initialisation des données
		var expressions = data.split('\n');
		var nouvelle_expression;
		var jeton = Math.floor(Math.random() * 3);
		var variante_A = 1; //Math.ceil(jeton / 2);
		var variante_B = 0; //jeton % 2;

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
				expressions_shuffle_global = expressions_shuffle_global.filter(expression => expression.split(' ').length > 4);

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

		//affichage de la nouvelle expression
		console.log(nouvelle_expression);
	}); 
})();