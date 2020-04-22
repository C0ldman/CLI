// import {compress} from "./utils";

const commander = require('commander'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	chalk = require('chalk'),
	path = require('path');

// import * as get from './getInfo.js';
// import {write} from './write.js';
// import * as image from './utils.js';
// import * as create from './create/create.js'
// import * as css from './csspretty.js'

commander.version(pkg.version).description('Filler for cobalt presentations')
.command('pretty <id>').action((id)=>{
		console.log(id);
	});
commander.command('compress <id>').action((id)=>{
	console.log(id);
});

commander.arguments('<id>')
	.action((id)=>{
		console.log(id);
	});


// commander
// 	.option('-s --size', 'Don\'t make half size of images in styles(add dimensions of image "as is")')
// 	.option('-c --compress', 'Compressing images and make even dimensions')
// 	.option('-v --version', 'Current version')
// 	.option('-p --prettyfycss', 'Sort properties in css file')
// 	.arguments('<id>')
// 	.description('Fill models,localization,styles from html')
// 	.action((id) => {
// 		// process.chdir('/Users/y.ukrainets/Projects/Mylan/Australia/prep');
// 		// process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
//
// 	})

export function cli(args) {
	commander.parse(args)
}
