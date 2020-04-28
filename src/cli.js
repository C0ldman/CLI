const commander = require('commander'),
	pkg = require('../package.json'),
	chalk = require('chalk');

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
		// process.chdir('/Volumes/160Gb/Projects/biogen/MSopener/multiplechoices-opener-ca-eng/');
		(async () => {
			let slide = getSlideInfo(id);
			let tags = getAllTags(id);
			for (let tag of tags) {
				let newElement = await createElement(tag);
				let newSlide = await updateSlide(newElement, slide);
				slide = {...slide,...newSlide};
			}
			await write(slide)
				.then(console.log(chalk.hex('#28FE14')('Done!')));
		})();
		notifyUpdate(pkg);
	});

commander.command('pretty <id>')
	.action((id) => {
		let slide = getSlideInfo(id);
		prettifyCSS(slide.stylesFile)
			.then(console.log(chalk.hex('#28FE14')(`File ${id}.css prettyfied!`)));
		notifyUpdate(pkg);
	});

commander.command('compress <id>, [filename]')
	.action((id, filename) => {
		let slide = getSlideInfo(id);
		compressImages(id, filename)
			.then(console.log(chalk.hex('#28FE14')(`Compression complete!`)));
		notifyUpdate(pkg);
	});

commander.command('clearClass <id>, [className]')
	.action((id, className = 'pa') => {
		console.log(process.cwd());
		let slide = getSlideInfo(id);
		removeClassFromHtml(presentation.htmlFile, className).then(console.log(`Removing class ${className} from file ${id}.html complete!`));
		notifyUpdate(pkg);
	});

export function cli(args) {
	commander.parse(args)
}
