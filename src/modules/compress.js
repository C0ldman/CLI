const imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant');

export async function compressImages(id, name) {
	name == undefined ? name=`*.{jpg,png}`: name;
	let file = [];
	file.push(`./app/media/images/${id}/${name}`);
	await imagemin(file, {
		destination: `./app/media/images/${id}`,
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.95, 1],
				strip:true,
				speed:1
			})
		]
	});
}
