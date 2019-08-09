const   chalk = require('chalk'),
		fs = require('fs'),
		commander = require('commander'),
		cheerio = require('cheerio'),
		path = require('path'),
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

function addTextModels(){}
function addStyles(id){}


commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html','Slide ID to add model,localization,styles from HTML')
	.option('-i --images','Slide ID to fill with co-image HTML,model and styles from images folder')
	.arguments('<id>')
	.description('Fill models,localization,styles from html file or images folder')
	.action((id) => {
		const $ = cheerio.load(getSlideContent(id));
		let textTags = $('co-text');
		let containerTags = $('co-container');
		let listTags = $('co-list');
		let tableTags = $('co-table');
		let graphTags = $('co-bar-graph');
		let buttonTags = $('co-button');
		let popupTags = $('co-popup');
		let imageTags = $('co-image');
		
		if (commander.images) {
			console.log('bls');
		}
	});

export function cli(args) {
	commander.parse(args)
}
