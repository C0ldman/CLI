export function localization(modelsArray) {
    let models = modelsArray.map((name) => {
        let model = { name: "", content: {} };
        model.name = `${name}`;
        model.content = ``;
        return model
    });
    return models
}

export function model(modelsArray) {
    let models = modelsArray.map((name) => {
        let model = { name: "", content: {} };
        model.name = `${name}`;
        model.content.html = `t.${name}`;
        return model
    });
    return models
}

export function style(idArray) {
    let styles = idArray.map((id) => {
        let style = `\r\n#${id} {
		width:100px;
		height:100px;
		transform:matrix(1,0,0,1,0,0)}`;
        return style
    });
    return styles
}