const   chalk = require('chalk'),
		fs = require('fs'),
		commander = require('commander'),
		path = require('path')

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
			let content = fs.createReadStream(`${id}.html`, 'utf8');
			return content.pipe(process.stdout)
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
			let content = fs.createReadStream(`${id}.css`);
			return content.pipe(process.stdout)
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideStyles: ${err}`));
	}
};


commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html <slideIDhtml>','Slide ID to add model,localization,styles from HTML')
	.option('-i --images <slideIDimages>','Slide ID to fill with co-image HTML,model and styles from images folder')
	.description('Fill models,localization,styles from html file or images folder')
	.action(() => {
	
	
	
	});

export function cli(args) {
	commander.parse(args)
}
