const
	commander = require('commander'),
	cheerio = require('cheerio'),
	sizeOf = require('image-size'),
	gm = require('gm'),
	im = require('imagemagick'),
	path = require('path'),
	imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant');

import { getImageDimensions, getModels, getImagesFileList, getImagesIds, getSlidesList, getSlideContent, getSlideModel, getSlideLocalization, getSlideStyles, getIds } from './getInfo.js';
import { createStyles, createTextModels, createTextLocalization, createListModels, createListLocalization, createPopupModels, createImagesModels, createImagesStyles, createImagesHTML } from './create.js';
import { writeStyles, writeModels, writeHTML, writeLocalization } from './write.js';
import { isOdd, compress } from './utils.js'




commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Slide ID to add model,localization,styles from HTML')
	.option('-i --images', 'Slide ID to add model,localization,styles for images from HTML'
	.option('-f --files', 'Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
		const $ = cheerio.load(getSlideContent(id)),
			stylesFile = `./app/styles/${id}.css`,
			modelFile = `./app/data/models/${id}.json`,
			htmlFile = `./app/${id}.html`,
			language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang,
			localizationFile = `./app/i18n/${language}`;


		if (commander.html) {
			let textTags = $('co-text').toArray();
			let containerTags = $('co-container').toArray();
			let listTags = $('co-list').toArray();
			// TODO
			// let tableTags = $('co-table').toArray();
			// let graphTags = $('co-bar-graph').toArray();
			// let buttonTags = $('co-button').toArray();
			let popupTags = $('co-popup').toArray();
			

			if (textTags.length) {
				let textId = getIds(textTags);
				let textModels = getModels(textTags);
				writeStyles(id, createStyles(textId));
				writeModels(id, createTextModels(textModels));
				writeLocalization(id, createTextLocalization(textModels));
			}
			;

			if (containerTags.length) {
				let containersId = getIds(containerTags);
				writeStyles(id, createStyles(containersId));
			}
			;

			if (listTags.length) {
				let listId = getIds(listTags);
				let listModels = getModels(listTags);
				writeStyles(id, createStyles(listId));
				writeModels(id, createListModels(listModels));
				writeLocalization(id, createListLocalization(listModels));
			};

			if (popupTags.length) {
				let popupModels = getModels(popupTags);
				writeModels(id, createPopupModels(popupModels));
			};
		}

		if (commander.images) {
			let imagesTags = $('co-image').toArray();
			let imagesId = getIds(imagesTags);
			writeStyles(id, createStyles(imagesId));
			writeModels(id, createImagesModels(id, imagesId));			
		}
		if (commander.files) {
			// let imagesFiles=getImagesFileList(id);
			// if (imagesFiles.length) {
			// 	let imagesId= getImagesIds(id);
			// 	writeStyles(id, createImagesStyles(id,imagesId));
			// 	writeModels(id, createImagesModels(id,imagesId));
			// 	writeHTML(id, createImagesHTML(id,imagesId));
			// 	compress(id);
			// };
			// im.convert(['/Users/y.ukrainets/Projects/Mylan/Australia/prep/app/images/titleSlide/rainbow.png', '-resize', '25x120', '/Users/y.ukrainets/Projects/Mylan/Australia/prep/app/images/titleSlide/rainbow1.png'],function(err, metadata){
			// 	if (err) throw err;
			// 	console.log('success! Checkout your new thumb: ');
			// });
		}
	});

export function cli(args) {
	commander.parse(args)
}

