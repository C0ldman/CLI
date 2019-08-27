const fs = require('fs');

export function writeStyles(id,data) {
	fs.appendFileSync(`./app/styles/${id}.css`, data);
}

export function writeModels(id,data) {
	fs.appendFileSync(`./app/data/models/${id}.json`, data);
}

export function writeHTML(id,data) {
	fs.appendFileSync(`./app/${id}.html`, data);
}

export function writeLocalization(id,data) {
	let language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
	let locPath = `./app/i18n/${language}`;
	fs.appendFileSync(`${locPath}/${id}.json`, data);
}
