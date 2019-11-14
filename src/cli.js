import { compress } from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	path = require('path');



import * as get from './getInfo.js';
import { write } from './write.js';
import * as image from './utils.js';
import * as create from './create/create.js'



commander.version('1.0.5').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Adding model,localization,styles by tags from HTML-file. Don\'t including co-image tags(to include all tags add option -i)')
	.option('-i --images', 'Adding model,localization,styles for co-images from HTML(if ID of co-image tag == filename, half dimensions of image will be added to styles automatically)')
	.option('-f --files', 'Adding HTML-tags,models and styles for images from slide\'s images folder. Checks dimensions for odd values and adding transparent pixels if needed.')
	.option('-s --size', 'Don\'t make half size of images in styles(add dimensions of image "as is")')
	.option('-c --compress', 'Compressing images (reduce the file size)')
	.option('-v --version', 'Current version')
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

		if (commander.version) {
			console.log(pkg.version);
		}

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


		};

		updateNotifier({ pkg, updateCheckInterval: 1000 * 60 * 60 * 1 }).notify();
	});

export function cli(args) {
	commander.parse(args)
}

