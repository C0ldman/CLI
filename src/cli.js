const   chalk = require('chalk'),
		fs = require('fs'),
		commander = require('commander'),
		cheerio = require('cheerio'),
		gm = require('gm').subClass({imageMagick: true});

function getSlidesList(){
	try {
		let content = JSON.parse(fs.readFileSync("structure.json"));
		let slides=[];
		for (let key in content.slides) {
			slides.push(key)
		}
		return slides
	} catch (err) {
		console.error(chalk.red(`getSlidesList: ${err}`));
	}
};

function getSlideContent(id){
	try {
		if(getSlidesList().includes(id)) {
			process.chdir('./app');
			let content = fs.readFileSync(`${id}.html`, 'utf8');
			return content
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideContent: ${err}`));
	}
};

function getSlideModel(id){
	try {
		if(getSlidesList().includes(id)) {
			process.chdir('./app/data/models');
			let content = JSON.parse(fs.readFileSync(`${id}.json`));
			return content
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideModel: ${err}`));
	}
};

function getSlideLocalization(id){
	try {
		let language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang;
		let locPath =`./app/i18n/${language}`;
		if(getSlidesList().includes(id)) {
			process.chdir(locPath);
			let content = JSON.parse(fs.readFileSync(`${id}.json`));
			return content
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideLocalization: ${err}`));
	}
};

function getSlideStyles(id){
	try {
		if(getSlidesList().includes(id)) {
			process.chdir('./app/styles');
			let content = fs.readFileSync(`${id}.css`);
			return content
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideStyles: ${err}`));
	}
};

function getIds (content) {
	let ids=content.map((tag)=>{
		return tag.attribs.id
	});
	return ids
}

function createStyles (idArray) {
	let styles=idArray.map((id)=>{
		let style ='#'+id+' { width:100px;height:100px;transform:matrix(1,0,0,1,0,0)}';
		return style
	});
	return styles
}

function getModels (content) {
	let models=content.map((tag)=>{
		return tag.attribs.model.slice(2)
	});
	return models
}


commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html','Slide ID to add model,localization,styles from HTML')
	.option('-i --images','Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep/');
		const $ = cheerio.load(getSlideContent(id));
		let textTags = $('co-text').toArray();
		let containerTags = $('co-container').toArray();
		let listTags = $('co-list').toArray();
		let tableTags = $('co-table').toArray();
		let graphTags = $('co-bar-graph').toArray();
		let buttonTags = $('co-button').toArray();
		let popupTags = $('co-popup').toArray();
		let imageTags = $('co-image').toArray();
		
		if (textTags.length){
			let textId = getIds(textTags);
			let textModels = getModels(textTags);
			let style = createStyles(textId);
		}
		
		if (commander.images) {}
	});

export function cli(args) {
	commander.parse(args)
}
