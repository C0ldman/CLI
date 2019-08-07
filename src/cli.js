const chalk = require('chalk'),
	fs = require('fs'),
	commander = require('commander')


commander.version('1.0.0').description('Filler for cobalt presentations');
commander
	.command('index')
	.alias('in')
	.description('Fill models,localization,styles from index.html')
	.action(() => {
		let directory = process.cwd();
		
		try {
			process.chdir('./app');
			console.log(`New directory: ${process.cwd()}`);
		} catch (err) {
			console.error(`chdir: ${err}`);
		}
		
	});

export function cli(args) {
	console.log('234234');
	commander.parse(args)
}
