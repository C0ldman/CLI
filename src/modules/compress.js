const imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant');

export async function compress(id, name) {
	name == undefined ? name=`*.{jpg,png}`: name;
	let file = [];
	file.push(`./app/media/images/${id}/${name}`);
	const files = await imagemin(file, {
		destination: `./app/media/images/${id}`,
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});
}
