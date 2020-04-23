// import {compress} from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	chalk = require('chalk'),
	path = require('path');

// import * as get from './getInfo.js';
// import {write} from './write.js';
// import * as image from './utils.js';
// import * as create from './create/create.js'
import * as css from './modules/csspretty.js'
import {compress} from './modules/compress.js'

commander.version(pkg.version).description('Filler for cobalt presentations')
	.command('pretty <id>').action((id) => {
	let presentation = getPresentationInfo(id);
	css.prettify(presentation.stylesFile)
		.then(console.log(`File ${id}.css prettyfied!`));
});

commander.command('compress <id>, [filename]').action((id, filename) => {
	process.chdir('/Volumes/160Gb/Projects/biogen/MSopener/multiplechoices-opener-ca-eng/');
	let presentation = getPresentationInfo(id);
	compress(id, filename)
		.then(console.log(`Compression complete!`));
});

commander.arguments('<id>')
	.action((id) => {
		console.log(id);
	});


// commander
// 	.option('-s --size', 'Don\'t make half size of images in styles(add dimensions of image "as is")')
// 	.option('-c --compress', 'Compressing images and make even dimensions')
// 	.option('-v --version', 'Current version')
// 	.option('-p --prettyfycss', 'Sort properties in css file')
// 	.arguments('<id>')
// 	.description('Fill models,localization,styles from html')
// 	.action((id) => {
// 		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
// 		// process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
//
// 	})

function getPresentationInfo(id) {
	let info = {};
	info.language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
	info.stylesFile = `./app/styles/${id}.css`;
	info.modelFile = `./app/data/models/${id}.json`;
	info.htmlFile = `./app/${id}.html`;
	info.localizationFile = `./app/i18n/${info.language}/${id}.json`;
	return info
}

export function cli(args) {
	commander.parse(args)
}
