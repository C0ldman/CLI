const fs = require('fs'),
	chalk = require('chalk');


	
	export function writeStyles(id, data) {
		fs.appendFileSync(`./app/styles/${id}.css`, data);
	}

	export function writeModels(id, data) {
		fs.appendFileSync(`./app/data/models/${id}.json`, data);
	}

	export function writeHTML(id, data) {
		fs.appendFileSync(`./app/${id}.html`, data);
	}

	export function writeLocalization(id, data) {
		let language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
		let locPath = `./app/i18n/${language}`;
		fs.appendFileSync(`${locPath}/${id}.json`, data);
	}


export function write(path, data) {
	if (path.slice(-4) == 'json') {
		let file = JSON.parse(fs.readFileSync(path));
		data.forEach((element) => {
			file[element.name] = element.content;
		});
		let jsonString = JSON.stringify(file);
		fs.writeFileSync(path, jsonString, (err) => {
			if (err) {
				console.log(`Error writing file ${path}`, err)
			}
		});
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	} else {
		data.forEach((element) => {
			fs.appendFileSync(path, element, err => {
				if (err) {
					console.log(`Error writing file ${path}`, err)
				}
			});
		});
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	}
}
