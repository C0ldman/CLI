const fs = require('fs');

export async function write(slide) {
	fs.writeFileSync(slide.localizationFile, JSON.stringify(slide.localization,null, 4), (err) => {
		if (err) {
			console.log(`Error writing file ${slide.localizationFile}`, err)
		}
	});
	fs.writeFileSync(slide.modelFile, JSON.stringify(slide.model,null, 4), (err) => {
		if (err) {
			console.log(`Error writing file ${slide.modelFile}`, err)
		}
	});
	fs.writeFileSync(slide.stylesFile, slide.styles, (err) => {
		if (err) {
			console.log(`Error writing file ${slide.stylesFile}`, err)
		}
	});
}

