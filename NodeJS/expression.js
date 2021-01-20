const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto('https://www.expressio.fr/toutes-les-expressions');
	await page.screenshot({path: 'expression.png'});

	var expression = [], expression_page;

	/*while (1 == 1) {
		expression_page = await page.evaluate(() => {
			var expression = [];
			$.each($('ul li a>span:nth-of-type(1)'), function(index, value){
				expression.push(value.innerText.trim());  
			});
			return expression;
		});
		expression.concat(expression_page);
		try {
			console.log('click')
			await page.waitForSelector("a[rel='next']",{timeout:1000}); 
			await page.click("a[rel='next']", {waitUntil: 'domcontentloaded'});
			console.log('click')
		}
		catch(err) {
			console.log('break')
			break;
		}
	}*/

	expression_page = await page.evaluate(() => {
		var expression = [];
		$.each($('ul li a>span:nth-of-type(1)'), function(index, value){
			expression.push(value.innerText.trim());  
		});
		return expression;
	});
	expression = expression.concat(expression_page);
	
	for (var i = 2; i <= 99; i++) {
		await page.goto('https://www.expressio.fr/toutes-les-expressions/page-' + i);
		expression_page = await page.evaluate(() => {
			var expression = [];
			$.each($('ul li a>span:nth-of-type(1)'), function(index, value){
				expression.push(value.innerText.trim());  
			});
			return expression;
		});
		expression = expression.concat(expression_page);
	}
	
	await browser.close();	
	await fs.writeFile('expression.txt', expression.join('\n'), function (err,data) {
		console.log(err);
		console.log(data);
	});
})();