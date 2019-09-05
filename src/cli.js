const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	// sizeOf = require('image-size'),
	path = require('path'),
	imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant');

import * as get from './getInfo.js';
import { write } from './write.js';
import { isOdd, compress } from './utils.js';
import * as create from './create/create.js'



commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Slide ID to add model,localization,styles from HTML')
	.option('-i --images', 'Slide ID to add model,localization,styles for images from HTML')
	.option('-f --files', 'Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
		process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
		const $ = cheerio.load(get.slideContent(id)),
			stylesFile = `./app/styles/${id}.css`,
			modelFile = `./app/data/models/${id}.json`,
			htmlFile = `./app/${id}.html`,
			language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang,
			localizationFile = `./app/i18n/${language}/${id}.json`;


		if (commander.html) {
			let textTags = $('co-text').toArray();
			let containerTags = $('co-container').toArray();
			let listTags = $('co-list').toArray();
			// TODO
			// let tableTags = $('co-table').toArray();
			// let graphTags = $('co-bar-graph').toArray();
			// let buttonTags = $('co-button').toArray();
			// let popupTags = $('co-popup').toArray();


			if (textTags.length) {
				let textId = get.ids(textTags);
				let textModels = get.models(textTags);
				write(stylesFile, create.cotext.styles(textId));
				write(modelFile, create.cotext.models(textModels));
				write(localizationFile, create.cotext.localizations(textModels));
			};

			if (containerTags.length) {
				let containersId = get.ids(containerTags);
				write(stylesFile, create.cocontainer.styles(containersId));
			};

			if (listTags.length) {
				let listId = get.ids(listTags);
				let listModels = get.models(listTags);
				write(stylesFile, create.colist.styles(listId));
				write(modelFile, create.colist.models(id, listModels));
				write(localizationFile, create.colist.listLocalizations(listModels));
			};

			// if (popupTags.length) {
			// 	let popupModels = get.models(popupTags);
			// 	writeModels(id, create.popupModels(popupModels));
			// };
		}

		if (commander.images) {
			let imagesTags = $('co-image').toArray();
			let imagesId = get.ids(imagesTags);
			write(stylesFile, create.coimage.styles(imagesId));
			write(modelFile, create.coimage.models(id, imagesId));
		}

		if (commander.files) {

			let tags = get.allTags(id);

			tags.forEach((element) => {
				let tag = element.name.split('-').join('');
				if (create[tag]) {
					if (create[tag].localization) { };
					if (create[tag].style) {  };
					if (create[tag].model) {  };
				}
			})

		}
	});

export function cli(args) {
	commander.parse(args)
}

