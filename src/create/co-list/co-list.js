export function localization(modelName, quantity = 3) {
	let models = [];
	for (let i = 1; i <= quantity; i++) {
		models.push({name: `${modelName}Text${i}`, content: ""});
	}
	return models
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

export function model(id, modelName, quantity = 3, style = 'icon') {
	let model = {name: "", content: {}};
	model.name = `${modelName}`;
	model.content.listStyle = style;
	model.content.items = [];
	for (let i = 1; i <= quantity; i++) {
		if (style == 'icon') {
			let element = {"text": {}, "icon": {"scr": ""}};
			element.text.html = `t.${modelName}Text${i}`;
			element.icon.src = `media/images/${id}/${modelName}Bullet${i}.png`;
			model.content.items.push(element);
		}
		;
		if (style == 'number') {
			let element = {"text": {}, "number": "-"};
			element.text.html = `t.${modelName}Text${i}`;
			model.content.items.push(element);
		}
	}
	
	return model
}
