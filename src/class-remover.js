
export function classInHtml(file,toRemove='pa'){

}

let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
let classPaRegexp = /`(?<=[\s|\"])${toRemove}(?=[\s|"])\s{0,1}`/gm;
let emptyClassRegexp = /class=""\s{0,1}/gm;
let newHtmlContent = htmlContent.replace(classPaRegexp,'').replace(emptyClassRegexp,'');
fs.writeFileSync(htmlFile, newHtmlContent);
