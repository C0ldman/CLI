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

export function imagesFileList(id) {
	let list = fs.readdirSync(`./app/media/images/${id}`, 'utf8');
	return list
}

export function  imageNameWithDimension(id,name) {
	return imagesFileList(id).filter(item => item.slice(0, -4)==name)
}

export function imagesFileNames(id) {
	let list = fs.readdirSync(`./app/media/images/${id}`, 'utf8');
	
	return list.map((element)=>{
		return element.slice(0,-4)
	})
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