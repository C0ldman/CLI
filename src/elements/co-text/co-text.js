export function localization(modelName) {
	let model = {};
	model[modelName] = ``;
	return model
}

export function model(id, modelName) {
	let model = {};
	model[modelName] = {};
	model[modelName]['html'] = `t.${modelName}`;
	return model
}

export function style(elementId) {
	let style = `\r\n#${elementId} {
        position:absolute;
		top:0;
		left:0;
		width:150px;
		height:30px;
		transform:matrix(1,0,0,1,0,0);}`;
	return style
}
