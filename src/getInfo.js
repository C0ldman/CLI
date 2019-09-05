const chalk = require('chalk'),
	cheerio = require('cheerio'),
	fs = require('fs');

export function allTags(id) {
	let tags = [];
	let $ = cheerio.load(slideContent(id));
	$('article').find('*').each((i, elem) => {
		tags.push(elem)
	});
	return tags
}

export function imageDimensions(id, name) {
	return sizeOf(`./app/media/images/${id}/${name}`)
}

export function models(content) {
	let models = content.map((tag) => {
		return tag.attribs.model.slice(2)
	});
	return models
}

export function imagesFileList(id) {
	let list = fs.readdirSync(`./app/media/images/${id}`, 'utf8');
	return list
}

export function imagesIds(id) {
	let imageFiles = imagesFileList(id);
	return imageFiles.map((name) => {
		let newName = name.charAt(0).toLowerCase() + name.slice(1)
		return newName.slice(0, -4)
	})
}

export function slidesList() {
	try {
		let content = JSON.parse(fs.readFileSync("structure.json"));
		let slides = [];
		for (let key in content.slides) {
			slides.push(key)
		}
		return slides
	} catch (err) {
		console.error(chalk.red(`getSlidesList: ${err}`));
	}
};

export function slideContent(id) {
	try {
		if (slidesList().includes(id)) {
			let content = fs.readFileSync(`./app/${id}.html`, 'utf8');
			return content
		} else {
			throw new Error(`No such slide ID ${id}`);
		};
	} catch (err) {
		console.error(chalk.red(`getSlideContent: ${err}`));
	}
};
export function ids(content) {
	let ids = content.map((tag) => {
		return tag.attribs.id
	});
	return ids
}
