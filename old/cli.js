import {compress} from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	chalk = require('chalk'),
	path = require('path');

import * as get from './getInfo.js';
import {write} from './write.js';
import * as image from './utils.js';
import * as create from '../src/create/create.js'
import * as css from './csspretty.js'

commander.version(pkg.version).description('Filler for cobalt presentations');
commander
	.option('-s --size', 'Don\'t make half size of images in styles(add dimensions of image "as is")')
	.option('-c --compress', 'Compressing images and make even dimensions')
	.option('-v --version', 'Current version')
	.option('-p --prettyfycss', 'Sort properties in css file')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
		// process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
		const stylesFile = `./app/styles/${id}.css`,
			modelFile = `./app/data/models/${id}.json`,
			htmlFile = `./app/${id}.html`,
			language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang,
			localizationFile = `./app/i18n/${language}/${id}.json`;
		if (commander.prettyfycss) {
			css.prettify(stylesFile);
			return
		}

		if (commander.compress) {
			let images = get.imagesFileList(id);
			images.forEach(imageFile => {
				(async () => {
					await image.updateDimensions(id, imageFile);
					image.compress(id, imageFile)
				})()
			})
		}

		let tags = get.allTags(id);
		tags.forEach((element) => {
			let tag = element.name.split('-').join('');
			(tag == 'coimage' && get.imagesFileNames(id).includes(element.attribs.id)) ? coImageFlow(element) : normalFlow(element);
			updateNotifier({ pkg, updateCheckInterval: 100 * 60 * 60 * 1 }).notify();
		});

		function normalFlow(element) {
			let tag = element.name.split('-').join('');
			let model;
			element.attribs.model ? model = element.attribs.model.slice(2) : model = '';
			if (create[tag]) {

				if (create[tag].localization && model) {
					write(localizationFile, create[tag].localization(model));
				};
				if (create[tag].style && element.attribs.id) {
					write(stylesFile, create[tag].style(element.attribs.id));
				};
				if (create[tag].model && model) {
					write(modelFile, create[tag].model(id, model));
				};

			}
		}

		function coImageFlow(element) {
			let tag = element.name.split('-').join('');
			let model;
			element.attribs.model ? model = element.attribs.model.slice(2) : model = '';
			image.getImage(id, get.imageNameWithDimension(id, element.attribs.id))
				.then((img) => {
					let width, height;
					if (commander.size) {
						width = img.width;
						height = img.height;
					}else{
						width = img.width/2;
						height = img.height/2;
						image.isOdd(img.width) ? width = width + 0.5 : width;
						image.isOdd(img.height) ? height = height + 0.5 : height;
						if ((image.isOdd(img.width) || image.isOdd(img.height)) && !commander.compress) {
							console.log(chalk.hex('#FF0000')(`Odd dimensions of ${get.imageNameWithDimension(id, element.attribs.id)} Width:${img.width} Height:${img.height}`));
						}
					}
					
					write(modelFile, create.coimage.model(id, model, get.imageNameWithDimension(id, element.attribs.id)));
					write(stylesFile, create.coimage.style(model, width, height));
				});
		}
	})

export function cli(args) {
	commander.parse(args)
}
