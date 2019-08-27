const chalk = require('chalk'),
	fs = require('fs');
export function getImageDimensions(id,name){
	return sizeOf(`./app/media/images/${id}/${name}`)
}

export function getModels(content) {
	let models = content.map((tag) => {
		return tag.attribs.model.slice(2)
	});
	return models
}

export function getImagesFileList(id) {
	let list = fs.readdirSync(`./app/media/images/${id}`,'utf8');
	return list
}

export function getImagesIds(id){
	let imageFiles=getImagesFileList(id);
	return imageFiles.map((name)=>{
		let newName= name.charAt(0).toLowerCase() + name.slice(1)
		return newName.slice(0,-4)
	})
}

export function getSlidesList() {
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

export function getSlideContent(id) {
	try {
		if (getSlidesList().includes(id)) {
			let content = fs.readFileSync(`./app/${id}.html`, 'utf8');
			return content
		} else {
			throw new Error('No such slide ID');
		};
	} catch (err) {
		console.error(chalk.red(`getSlideContent: ${err}`));
	}
};

export function getSlideModel(id) {
	try {
		if (getSlidesList().includes(id)) {
			let content = JSON.parse(fs.readFileSync(`./app/data/models/${id}.json`));
			return content
		} else {
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideModel: ${err}`));
	}
};

export function getSlideLocalization(id) {
	try {
		let language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
		let locPath = `./app/i18n/${language}`;
		if (getSlidesList().includes(id)) {
			let content = JSON.parse(fs.readFileSync(`${locPath}/${id}.json`));
			return content
		} else {
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideLocalization: ${err}`));
	}
};

export function getSlideStyles(id) {
	try {
		if (getSlidesList().includes(id)) {
			process.chdir('./app/styles');
			let content = fs.readFileSync(`./app/styles/${id}.css`);
			return content
		} else {
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideStyles: ${err}`));
	}
};

export function getIds(content) {
	let ids = content.map((tag) => {
		return tag.attribs.id
	});
	return ids
}
