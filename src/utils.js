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
