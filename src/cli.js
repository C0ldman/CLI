const chalk = require('chalk'),
	fs = require('fs'),
	commander = require('commander'),
	cheerio = require('cheerio'),
	sizeOf = require('image-size'),
	gm = require('gm');

function isOdd(num) { return num % 2;}

function getSlidesList() {
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

function getSlideContent(id) {
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

function getSlideModel(id) {
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

function getSlideLocalization(id) {
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

function getSlideStyles(id) {
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

function getIds(content) {
	let ids = content.map((tag) => {
		return tag.attribs.id
	});
	return ids
}

function createStyles(idArray) {
	let styles = idArray.map((id) => {
		let style = '\r\n#' + id + ' {\r\nwidth:100px;\r\nheight:100px;\r\ntransform:matrix(1,0,0,1,0,0)}';
		return style
	});
	return styles
}

function createTextModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {\r\n"html": "t.${name}"\r\n}`;
		return model
	});
	return models
}

function createTextLocalization(modelsArray) {
	let models = modelsArray.map((name) => {
		let localization = `\r\n"${name}": ""`;
		return localization
	});
	return models
}

function createListModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {\r\n"list-style": "icon"\r\n"items": [\r\n{\r\n"text": {\r\n"html": "t.${name}Text1"\r\n}\r\n"icon": {\r\n"src": "media/images/bullet1.png"\r\n}\r\n}\r\n{"text": { "html": "t.${name}Text2"}\r\n"icon": { "src": "media/images/bullet2.png" }\r\n}\r\n\r\n{"text": { "html": "t.${name}Text3"}\r\n"icon": { "src": "media/images/bullet3.png" }\r\n}\r\n]\r\n}`;
		return model
	});
	return models
}

function createListLocalization(modelsArray) {
	let models = modelsArray.map((name) => {
		let localization = `\r\n"${name}Text1": ""\r\n"${name}Text2": ""\r\n"${name}Text3": ""`;
		return localization
	});
	return models
}

function createPopupModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {\r\n"id": "${name}"\r\n"showCloseButton": true,\r\n"showOnSlideEnter": false,\r\n"hideOnOutsideTap": true,\r\n"closeOnWillgoto": true\r\n}`;
		return model
	});
	return models
}

function createImagesModels(id,modelsArray){
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name.toLowerCase()}":\r\n"src": "media/images/${id}/${name}.png"\r\n"position": "center center"\r\n"size": "100% 100%"\r\n}`;
		return model
	});
	return models
}

function createImagesStyles (id,idArray){
	let files=getImagesFileList(id);
	let fileName=files.values();
	let styles = idArray.map((idname) => {
		let width, height, name=fileName.next().value;
		let imageDimension = getImageDimensions(id,name);
		if(isOdd(imageDimension.width)){
			gm(`./app/images/${id}/${name}`).resize(`${imageDimension.width+1}`,imageDimension.height, '!')
		}else{width=imageDimension.width};
		if(isOdd(imageDimension.height)){
			gm(`./app/images/${id}/${name}`).resize(imageDimension.width,`${imageDimension.height+1}`, '!')
		}else{height=imageDimension.height};
		let style = `\r\n#${idname}  {\r\nwidth:${width/2}px;\r\nheight:${height/2}px;\r\ntransform:matrix(1,0,0,1,0,0)}`;
		return style
	});
	return styles
}

function getModels(content) {
	let models = content.map((tag) => {
		return tag.attribs.model.slice(2)
	});
	return models
}

function getImagesFileList(id) {
	let list = fs.readdirSync(`./app/media/images/${id}`,'utf8');
	return list
}

function getImagesIds(id){
	let imageFiles=getImagesFileList(id);
	return imageFiles.map((name)=>{
		return name.slice(0,-4)
	})
}

function writeStyles(id,data) {
	fs.appendFileSync(`./app/styles/${id}.css`, data);
}

function writeModels(id,data) {
	fs.appendFileSync(`./app/data/models/${id}.json`, data);
}

function writeLocalization(id,data) {
	let language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
	let locPath = `./app/i18n/${language}`;
	fs.appendFileSync(`${locPath}/${id}.json`, data);
}

function getImageDimensions(id,name){
	return sizeOf(`./app/media/images/${id}/${name}`)
}




commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html', 'Slide ID to add model,localization,styles from HTML')
	.option('-i --images', 'Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep/');
		
		const $ = cheerio.load(getSlideContent(id));
		
			
			let textTags = $('co-text').toArray();
			let containerTags = $('co-container').toArray();
			let listTags = $('co-list').toArray();
			// TODO
			// let tableTags = $('co-table').toArray();
			// let graphTags = $('co-bar-graph').toArray();
			// let buttonTags = $('co-button').toArray();
			let popupTags = $('co-popup').toArray();
			let imageTags = $('co-image').toArray();
			let imageFiles = getImagesFileList(id);
			
			if (textTags.length) {
				let textId = getIds(textTags);
				let textModels = getModels(textTags);
				writeStyles(id, createStyles(textId));
				writeModels(id, createTextModels(textModels));
				writeLocalization(id, createTextLocalization(textModels));
			};
			
			if (containerTags.length) {
				let containersId = getIds(containerTags);
				writeStyles(id, createStyles(containersId));
			};
			
			if (listTags.length) {
				let listId = getIds(listTags);
				let listModels = getModels(listTags);
				writeStyles(id, createStyles(listId));
				writeModels(id, createListModels(listModels));
				writeLocalization(id, createListLocalization(listModels));
			};
			
			if (popupTags.length) {
				let popupModels = getModels(popupTags);
				writeModels(id, createPopupModels(popupModels));
			};
		
		let imagesFiles=getImagesFileList(id);
		let imagesId= getImagesIds(id);
		console.log(createImagesStyles(id,imagesId));
		
		
		if (commander.images) {
			let imagesFiles=getImagesFileList(id);
			if (imagesFiles.length) {
				let imagesId= getImagesIds(id);
				
				writeStyles(id, createImagesStyles(id,imagesId));
				writeModels(id, createImagesModels(id,imagesId));
			};
		}
	});

export function cli(args) {
	commander.parse(args)
}

