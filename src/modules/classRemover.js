const fs = require('fs');

export async function removeClassFromHtml(htmlFile,toRemove='pa'){
	let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
	let classPaRegexp = new RegExp('(?<=[\\s|\\"])'+toRemove+'(?=[\\s|"])\\s{0,1}','gm') ;
	let emptyClassRegexp = new RegExp('class=""\\s{0,1}','gm');
	let newHtmlContent = htmlContent.replace(classPaRegexp,'').replace(emptyClassRegexp,'');
	fs.writeFileSync(htmlFile, newHtmlContent);
}

