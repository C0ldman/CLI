import {compress} from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cssParcer = require('css'),
	cheerio = require('cheerio'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	chalk = require('chalk'),
	path = require('path');

import * as get from './getInfo.js';
import {write} from './write.js';
import * as image from './utils.js';
import * as create from './create/create.js'
import * as css from './csspretty.js'

commander.version(pkg.version).description('Filler for cobalt presentations');
commander
	.command('remove-pa <id>', 'Remove class \"pa\" from html, styles correction')
	.action((id)=>{
		process.chdir('/Volumes/160Gb/Projects/biogen/Avonex-pregnancy/avonex-pregnancy-sk-eng/');
		const stylesFile = `./app/styles/${id}.css`,
			htmlFile = `./app/${id}.html`;
		// let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
		// let classPaRegexp = /(?<=[\s|\"])pa(?=[\s|"])\s{0,1}/gm;
		// let emptyClassRegexp = /class=""\s{0,1}/gm;
		// let newHtmlContent = htmlContent.replace(classPaRegexp,'').replace(emptyClassRegexp,'');
		// fs.writeFileSync(htmlFile, newHtmlContent);
		function isProperty(arr, property) {
			return arr.some((element) => {
				return element.property == property
			})
		}
		let newStyle=[{
			type: 'declaration',
			property: 'position',
			value: 'absolute'
		},
			{
				type: 'declaration',
				property: 'top',
				value: '0'
			},
			{
				type: 'declaration',
				property: 'left',
				value: '0'
			}]
		let styles = cssParcer.parse(fs.readFileSync(stylesFile, 'utf-8'));
		// let newSyles = cssParcer.parse('position: absolute;top: 0px;left: 0px;');
		styles.stylesheet.rules.forEach(item=>{
			item.declarations=[...item.declarations, ...newStyle]
		})
		console.log(styles);
	})

commander
	.command('fill')
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

		let tags = get.tags(id);
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
