const commander = require('commander'),
	fs = require('fs'),
	pkg = require('../package.json'),
	chalk = require('chalk'),
	path = require('path');

import {prettifyCSS} from './modules/csspretty'
import {getAllTags} from './modules/parser'
import {compressImages} from './modules/compress'
import {removeClassFromHtml} from './modules/classRemover'
import {getSlideInfo} from './modules/slideInfo'
import {notifyUpdate} from './modules/notifier'
import {createElement} from './modules/elementCreator'
import {updateSlide} from './modules/slideUpdater'
import {write} from './modules/write'

commander.version(pkg.version).description('Filler for cobalt presentations')
	.arguments('<id>')
	.action((id) => {
		process.chdir('/Volumes/160Gb/Projects/biogen/MSopener/multiplechoices-opener-ca-eng/');
		(async () => {
			let slide = getSlideInfo(id);
			let tags = getAllTags(id);
			for (let tag of tags) {
				let newElement = await createElement(tag);
				let newSlide = await updateSlide(newElement, slide);
				slide = {...slide,...newSlide};
			}
			await write(slide)
				.then(console.log('Writed!'));
		})();
		// notifyUpdate(pkg);
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
