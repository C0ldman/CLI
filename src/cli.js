import { compress } from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	path = require('path');


import * as get from './getInfo.js';
import { write } from './write.js';
import * as image from './utils.js';
import * as create from './create/create.js'



commander.version('1.0.4').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Slide ID to add model,localization,styles from HTML')
	.option('-i --images', 'Slide ID to add model,localization,styles for images from HTML')
	.option('-f --files', 'Slide ID to fill with co-image HTML,model and styles from images folder')
	.option('-s --size', 'Do not make half size of images in styles')
	.option('-c --compress', 'Compress images')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
		// process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
		const $ = cheerio.load(get.slideContent(id)),
			stylesFile = `./app/styles/${id}.css`,
			modelFile = `./app/data/models/${id}.json`,
			htmlFile = `./app/${id}.html`,
			language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang,
			localizationFile = `./app/i18n/${language}/${id}.json`;


		if (commander.html) {
			let tags = get.allTags(id);

			tags.forEach((element) => {
				let tag = element.name.split('-').join('');
				let model;
				element.attribs.model ? model = element.attribs.model.slice(2) : model = '';
				if (tag == 'coimage' && !commander.images) { return }
				if (tag == 'coimage' && get.imagesFileNames(id).includes(id)) {
					image.getImage(id, name)
						.then((img) => {
							let width, height;
							commander.size ? (width = img.width, height = img.height) : (width = img.width / 2, height = img.heigh / 2);

							write(modelFile, create.coimage.model(id, model));
							write(htmlFile, create.coimage.html(model));
							write(stylesFile, create.coimage.style(model, width, height));
						});
						return
				}
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
			})
		}

		if (commander.files) {
			let imagesList = get.imagesFileList(id);

			imagesList.forEach((name) => {
				let model = name.slice(0, -4);
				image.updateDimensions(id, name)
					.then(() => {
						if (commander.compress) {
							compress(id, name)
						}
					});
				image.getImage(id, name)
					.then((img) => {
						let width, height;
						commander.size ? (width = img.width, height = img.height) : (width = img.width / 2, height = img.heigh / 2);

						write(modelFile, create.coimage.model(id, model));
						write(htmlFile, create.coimage.html(model));
						write(stylesFile, create.coimage.style(model, width, height));
					});


			});


		}
	});

export function cli(args) {
	commander.parse(args)
}

