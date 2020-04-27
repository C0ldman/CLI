const css = require('css');

export async function updateSlide(element, slide) {
	let newSlide={};
	if (element && element.hasOwnProperty('model') && element.model!=undefined && element.model) {
		newSlide.model = {...element.model, ...slide.model}
	}
	
	if (element && element.localization!=undefined && element.localization) {
		newSlide.localization = {...element.localization, ...slide.localization}
	}
	
	if (element.styles!=undefined && element.styles) {
		newSlide.styles=updateCss(element,slide)
	}
	return newSlide
}


function includeId(arr, id) {
	return arr.some((arrVal)=> {
		return arrVal.selectors[0] == id;
	});
}

function getStyleIndex(arr, id) {
	return arr.findIndex((element) => {
		if (element.selectors[0] == id) return true
	})
}

function isProperty(arr, property) {
	return arr.some((element) => {
		return element.property == property
	})
}

function updateCss(element,slide){
	let file = css.parse(slide.styles);
	let fileStyles = file.stylesheet.rules;
	let incomeParsed = css.parse(element.styles).stylesheet.rules[0];
	let incomeStyles = css.parse(element.styles).stylesheet.rules[0].declarations;
	let incomeId = css.parse(element.styles).stylesheet.rules[0].selectors[0];
	
	if (includeId(fileStyles, incomeId)) {
		let rulesIndex = getStyleIndex(fileStyles, incomeId);
		incomeStyles.forEach((income) => {
			if (!isProperty(file.stylesheet.rules[rulesIndex].declarations, income.property)) {
				file.stylesheet.rules[rulesIndex].declarations.push(income);
			}
		});
	} else {
		file.stylesheet.rules.push(incomeParsed);
	}
	return css.stringify(file)
}
