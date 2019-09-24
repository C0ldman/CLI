import { resolve } from 'dns';

const sharp = require('sharp')

export function isOdd(num) { return num % 2; }

export function compress(id) {
	(async () => {
		const files = await imagemin([`./app/media/images/${id}/*.{jpg,png}`], {
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

export function addWidth(image) {
	sharp(image)
		.extend({
			top: 0,
			bottom: 0,
			right: 1,
			left: 0,
			background: { r: 0, g: 0, b: 0, alpha: 0 }
		})
		.toFile('PrepPill.png');
}

export function addHeight(image) {
	sharp(image)
		.extend({
			top: 0,
			bottom: 1,
			right: 0,
			left: 0,
			background: { r: 0, g: 0, b: 0, alpha: 0 }
		})
		.toFile('PrepPill.png');
}

export function checkDimensions(id, name) {

	let image = sharp(`./app/media/images/${id}/${name}`);
	let ddd = image.metadata()
		.then(function (metadata) {
			let change = {};
			change.width = isOdd(metadata.width);
			change.height = isOdd(metadata.height);
			resolve(change)
		});
		
	console.log(ddd)

	

}