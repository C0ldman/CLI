import { resolve } from 'dns';

const sharp = require('sharp'),
	imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant'),
	fs = require('fs');

export function isOdd(num) { return num % 2; }

export async function compress(id, name) {
	name ? name : `*.{jpg,png}`;
	let file = [];
	file.push(`./app/media/images/${id}/${name}`);

	(async () => {
		console.log(file);
		const files = await imagemin(file, {
			destination: `./app/media/images/${id}`,
			plugins: [
				imageminJpegtran(),
				imageminPngquant({
					quality: [0.6, 0.8]
				})
			]
		});
	})();
}

export function getImage(id, name) {
	let image = sharp(`./app/media/images/${id}/${name}`);

	return image.metadata()
}

export function updateDimensions(id, name) {
	let image = sharp(`./app/media/images/${id}/${name}`);
	return image.metadata()
		.then((metadata) => {
			let changeWidth = isOdd(metadata.width);
			let changeHeight = isOdd(metadata.height);
			if (changeWidth || changeHeight) {
				return image
					.extend({
						top: 0,
						bottom: Number(changeHeight),
						right: Number(changeWidth),
						left: 0,
						background: { r: 0, g: 0, b: 0, alpha: 0 }
					})
					.toFile(`./app/media/images/${id}/${name}temp`)
			} else {
				return new Promise((resolve, reject) => {
					resolve();
				})
			}

		})
		.then(() => {
			return new Promise((resolve, reject) => {
				fs.access(`./app/media/images/${id}/${name}temp`, fs.constants.F_OK, (err) => {
					if (!err) {
						fs.unlink(`./app/media/images/${id}/${name}`, (err) => {
							if (err) throw err;
						});
						resolve();
					}

				})
			});
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				fs.access(`./app/media/images/${id}/${name}temp`, fs.constants.F_OK, (err) => {
					if (!err) {
						fs.rename(`./app/media/images/${id}/${name}temp`, `./app/media/images/${id}/${name}`, (err) => {
							if (err) {
								throw err;
								return reject()
							}
						});
					}
					resolve();
				})


			});
		})


}
