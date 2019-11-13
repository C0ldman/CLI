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
			if(!file[element.name]) {
				file[element.name] = element.content;
			}
		})
	} else {
		if(!file[data.name]) {
			file[data.name] = data.content;
		}
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
	let fileStyles = file.stylesheet.rules;
	let incomeParsed = css.parse(data).stylesheet.rules[0];
	let incomeStyles = css.parse(data).stylesheet.rules[0].declarations;
	let incomeId = css.parse(data).stylesheet.rules[0].selectors[0];
	
	if (includeId(fileStyles, incomeId)) {
		console.log('present');
		// incomeStyles.forEach((newStyleItem) => {}
		
	}else{
		file.stylesheet.rules.push(incomeParsed);
	}
	
	fs.writeFileSync(path, css.stringify(file), err => {
		if (err) {
			console.log(`Error writing file ${path}`, err)
		}
		console.log('writed!');
	})
	
}

function writeToEndOfFile(path, data) {
	fs.appendFileSync(path, data, err => {
		if (err) {
			console.log(`Error writing file ${path}`, err)
		}
	})
}

function includeStyle(arr, style) {
	return arr.some(function (arrVal) {
		return arrVal.property == style.property;
	});
}

function includeId(arr, id) {
	return arr.some(function (arrVal) {
		return arrVal.selectors[0] == id;
	});
}
