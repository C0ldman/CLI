export function localization(modelName) {
    let models = [];
	models.push({name:`${modelName}Text1`,content:""});
	models.push({name:`${modelName}Text2`,content:""});
	models.push({name:`${modelName}Text3`,content:""});
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

export function model(id, modelName) {
        let model = { name: "", content: {} };
		model.name = `${modelName}`;
        model.content.listStyle = `icon`;
		model.content.items = [];
		for(let i=0;i<3;i++){
			let element = {"text":{},"icon":{"scr":""}};
			element.text.html = `t.${modelName}Text1`;
			element.icon.src = `media/images/${id}/${modelName}Bullet${i}.png`;
			model.content.items.push(element);
		}
        return model
}
