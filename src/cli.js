const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	sizeOf = require('image-size'),
	gm = require('gm'),
	im = require('imagemagick'),
	path = require('path'),
	imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant');

import {getImageDimensions,getModels,getImagesFileList,getImagesIds,getSlidesList,getSlideContent,getSlideModel,getSlideLocalization,getSlideStyles,getIds} from './getInfo.js';
// import * as create from './create.js';
import {write,writeStyles,writeModels,writeHTML,writeLocalization} from './write.js';
import {isOdd,compress} from './utils.js';
import * as create from './create/create.js'




commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Slide ID to add model,localization,styles from HTML')
	.option('-i --images', 'Slide ID to add model,localization,styles for images from HTML')
	.option('-f --files', 'Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
		const $ = cheerio.load(getSlideContent(id)),
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
			let popupTags = $('co-popup').toArray();
			

			if (textTags.length) {
				let textId = getIds(textTags);
				let textModels = getModels(textTags);
				writeStyles(id, create.styles(textId));
				writeModels(id, create.textModels(textModels));
				writeLocalization(id, create.textLocalization(textModels));
			}
			;

			if (containerTags.length) {
				let containersId = getIds(containerTags);
				writeStyles(id, create.styles(containersId));
			}
			;

			if (listTags.length) {
				let listId = getIds(listTags);
				let listModels = getModels(listTags);
				writeStyles(id, create.styles(listId));
				writeModels(id, create.listModels(listModels));
				writeLocalization(id, create.listLocalization(listModels));
			};

			if (popupTags.length) {
				let popupModels = getModels(popupTags);
				writeModels(id, create.popupModels(popupModels));
			};
		}

		if (commander.images) {
			let imagesTags = $('co-image').toArray();
			let imagesId = getIds(imagesTags);
			writeStyles(id, create.styles(imagesId));
			writeModels(id, create.imagesModels(id, imagesId));
		}
		if (commander.files) {
			let textTags = $('co-text').toArray();
			let textId = getIds(textTags);
			
			console.log(create.cotext.models(textId));
			// let imagesFiles=getImagesFileList(id);
			// if (imagesFiles.length) {
			// 	let imagesId= getImagesIds(id);
			// 	writeStyles(id, create.imagesStyles(id,imagesId));
			// 	writeModels(id, create.imagesModels(id,imagesId));
			// 	writeHTML(id, create.imagesHTML(id,imagesId));
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

