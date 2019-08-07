const   chalk = require('chalk'),
		fs = require('fs'),
		commander = require('commander')

function goToSlidesFolder(){
	try {
		process.chdir('./app');
		console.log(`New directory: ${process.cwd()}`);
	} catch (err) {
		console.error(`goToSlidesFolder: ${err}`);
	}
};

function goToImagesFolder(id=''){
	try {
		let newDir='./app/media/images/'+id;
		process.chdir(newDir);
		console.log(chalk.green(`New directory: ${process.cwd()}`));
	} catch (err) {
		console.error(chalk.red(`goToImagesFolder: ${err}`));
	}
};

function goToModelsFolder(){
	try {
		let newDir='./app/data/models/';
		process.chdir(newDir);
		console.log(chalk.green(`New directory: ${process.cwd()}`));
	} catch (err) {
		console.error(chalk.red(`goToModelsFolder: ${err}`));
	}
};

function goToLocalizationFolder(lang=''){
	try {
		let newDir='./app/i18n/'+lang;
		process.chdir(newDir);
		console.log(chalk.green(`New directory: ${process.cwd()}`));
	} catch (err) {
		console.error(chalk.red(`goToLocalizationFolder: ${err}`));
	}
};

function getLanguage(){
	try {
		process.chdir('./app/settings/');
		var content = JSON.parse(fs.readFileSync("app.json"));
		return content.lang
	} catch (err) {
		console.error(chalk.red(`getLanguage: ${err}`));
	}
};

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
			goToSlidesFolder();
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
			goToModelsFolder();
			let content = JSON.parse(fs.readFileSync(`${id}.json`));
			return content
		}else{
			throw new Error('No such slide ID');
		}
	} catch (err) {
		console.error(chalk.red(`getSlideModel: ${err}`));
	}
};


commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.option('-h --html <slideIDhtml>','Slide ID to add model,localization,styles from HTML')
	.option('-i --images <slideIDimages>','Slide ID to fill with co-image HTML,model and styles from images folder')
	.description('Fill models,localization,styles from html file or images folder')
	.action(() => {
		
		
		
		let directory =getSlideModel(commander.html);
		console.log(directory);
		
	});

export function cli(args) {
	commander.parse(args)
}
