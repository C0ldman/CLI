const fs = require('fs'),
	css = require('css'),
	chalk = require('chalk');

export function write(path, data) {
	if (path.slice(-4) == 'json') {
		let file = JSON.parse(fs.readFileSync(path));

		if (Array.isArray(data)) {
			data.forEach((element) => {
				file[element.name] = element.content;
			})
		} else {
			file[data.name] = data.content;
		};

		let jsonString = JSON.stringify(file);

		fs.writeFileSync(path, jsonString, (err) => {
			if (err) {
				console.log(`Error writing file ${path}`, err)
			}
		});

		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	} else if (path.slice(-3) == 'css') {
		let file = fs.readFileSync(path, 'utf8');
		let content = css.parse(file).stylesheet.rules;
		let incomeStyle = css.parse(data).stylesheet.rules[0].declarations;
		let incomeId = css.parse(data).stylesheet.rules[0].selectors[0];
		content.forEach((element) => {
			if (element.selectors[0] == incomeId) {
				console.log(incomeStyle);
				console.log(incomeId);
			}
		});

	} else {
		fs.appendFileSync(path, data, err => {
			if (err) {
				console.log(`Error writing file ${path}`, err)
			}
		});
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	}
}
