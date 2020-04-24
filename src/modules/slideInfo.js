const fs = require('fs');
export function getSlideInfo(id) {
	let info = {};
	info.language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
	info.stylesFile = `./app/styles/${id}.css`;
	info.modelFile = `./app/data/models/${id}.json`;
	info.htmlFile = `./app/${id}.html`;
	info.localizationFile = `./app/i18n/${info.language}/${id}.json`;
	info.model=JSON.parse(fs.readFileSync(`${info.modelFile}`));
	info.localization=JSON.parse(fs.readFileSync(`${info.localizationFile}`));
	info.styles=fs.readFileSync(`${info.stylesFile}`,'utf8');
	return info
}
