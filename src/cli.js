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
import {prettifyCSS} from './modules/csspretty'
import {getAllTags} from './modules/parser'
import {compressImages} from './modules/compress'
import {removeClassFromHtml} from './modules/classRemover'
import {getSlideInfo} from './modules/slideInfo'
import {notifyUpdate} from './modules/notifier'

commander.version(pkg.version).description('Filler for cobalt presentations')
	.arguments('<id>')
	.action((id) => {
		process.chdir('/Volumes/160Gb/Projects/biogen/MSopener/multiplechoices-opener-ca-eng/');
		let slide = getSlideInfo(id);
		console.log(slide.model);
		
		let tags = getAllTags(id);
		for (let tag of tags) {
		
		}
		notifyUpdate(pkg);
	});

commander.command('pretty <id>')
	.action((id) => {
		let slide = getSlideInfo(id);
		prettifyCSS(slide.stylesFile)
			.then(console.log(`File ${id}.css prettyfied!`));
		notifyUpdate(pkg);
	});

commander.command('compress <id>, [filename]')
	.action((id, filename) => {
		let slide = getSlideInfo(id);
		compressImages(id, filename)
			.then(console.log(`Compression complete!`));
		notifyUpdate(pkg);
	});

commander.command('clearClass <id>, [className]')
	.action((id, className = 'pa') => {
		console.log(process.cwd());
		let slide = getSlideInfo(id);
		removeClassFromHtml(presentation.htmlFile, className).then(console.log(`Removing class ${className} from file ${id}.html complete!`));
		notifyUpdate(pkg);
	});


// commander
// 	.option('-s --size', 'Don\'t make half size of images in styles(add dimensions of image "as is")')
// 	.arguments('<id>')
// 	.description('Fill models,localization,styles from html')
// 	.action((id) => {
// 		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
// 		// process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
//
// 	})


export function cli(args) {
	commander.parse(args)
}
