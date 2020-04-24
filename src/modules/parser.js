const chalk = require('chalk'),
	cheerio = require('cheerio'),
	fs = require('fs');

export function getAllTags(id) {
	try{
		let tags = [];
		let $ = cheerio.load(slideContent(id));
		$('article').find('*').each((i, elem) => {
			tags.push(elem)
		});
		return tags
	} catch(err) {
		console.error(chalk.red(`getTags: ${err}`));
	}
	
}

function slideContent(id) {
	try {
		if (slidesList().includes(id)) {
			let content = fs.readFileSync(`./app/${id}.html`, 'utf8');
			return content
		} else {
			throw new Error(`No such slide ID in structure: ${id}`);
		};
	} catch (err) {
		console.error(chalk.red(`getSlideContent: ${err}`));
	}
}

function slidesList() {
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
}
