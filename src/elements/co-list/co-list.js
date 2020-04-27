export function localization(modelName) {
	let model = {};
	model[`${modelName}Text1`] = "";
	model[`${modelName}Text2`] = "";
	model[`${modelName}Text3`] = "";
	return model
}

export function style(elementId) {
	let style = `\r\n#${elementId} {
		position:absolute;
		top:0;
		left:0;
		width:150px;
		height:100px;
		transform:matrix(1,0,0,1,0,0);}`;
	return style
}

export function model(id, modelName) {
	let model = {};
	model[modelName] = {};
	model[modelName]['listStyle'] = `icon`;
	model[modelName]['items'] = [];
	for (let i = 1; i <= 3; i++) {
		let element = {};
		element.text.html = `t.${modelName}Text${i}`;
		element.icon.src = `media/images/${id}/${modelName}Bullet${i}.png`;
		model[modelName].items.push(element);
	}
	return model
}
