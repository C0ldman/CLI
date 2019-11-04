const fs = require('fs'),
	css = require('css'),
	chalk = require('chalk');

export function write(path, data) {
	if (path.slice(-4) == 'json') {
		writeJSON(path, data);
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	} else if (path.slice(-3) == 'css') {
		writeCSS(path, data);
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	} else {
		writeToEndOfFile(path, data);
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	}
}

function writeJSON(path, data) {
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
}

function writeCSS(path, data) {
	let file = css.parse(fs.readFileSync(path, 'utf8'));
	let styles = file.stylesheet.rules;
	let incomeStyle = css.parse(data).stylesheet.rules[0].declarations;
	let incomeId = css.parse(data).stylesheet.rules[0].selectors[0];


	styles.forEach((element) => {
		if (element.selectors[0] == incomeId) {
			incomeStyle.forEach((newStyle) => {
				
			})
		}
	});

}

function writeToEndOfFile(path, data) {
	fs.appendFileSync(path, data, err => {
		if (err) {
			console.log(`Error writing file ${path}`, err)
		}
	})
}

function hasProperty(elementProp) { return elementProp.property == 'width' }