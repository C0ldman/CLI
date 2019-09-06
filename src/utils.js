const sharp = require('sharp')

export function isOdd(num) { return num % 2;}

export function compress(id){
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

sharp('PrepPill.png')
    .resize({ width: 940, height: 502 })
    .toFile('PrepPill.png');
