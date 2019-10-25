export function localization(modelName) {
        let model = { name: "", content: {} };
        model.name = `${modelName}`;
        model.content = ``;
        return model
}

export function model(id,modelName) {
        let model = { name: "", content: {} };
        model.name = `${modelName}`;
        model.content.html = `t.${modelName}`;
        return model
}

export function style(elementId) {
    let style = `\r\n#${elementId} {
		width:150px;
		height:30px;
		transform:matrix(1,0,0,1,0,0);}`;
        return style
}
