const fs = require('fs'),
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
	} else {
		fs.appendFileSync(path, data, err => {
			if (err) {
				console.log(`Error writing file ${path}`, err)
			}
		});
		console.log(chalk.hex('#28FE14')(`Successfully wrote file ${path}`));
	}
}