export function html(imagesIds) {
    let content = imagesIds.map((name) => {
        let html = `<co-image id="${name}" class="pa" model="m.${name}" user-label="${name} image"></co-image>`;
        return html
    });
    return content
}

export function models(id, modelsArray) {
    let models = modelsArray.map((name) => {
        let model = { name: "", content: {} };
        model.name = `${name}`;
        model.content.src = `media/images/${id}/${name}.png`;
        model.content.position = "center center";
        model.content.size = "contain";
        return model
    });
    return models
}

export function styles(idArray) {
    let styles = idArray.map((id) => {
        let style = `\r\n#${id} {
		width:100px;
		height:100px;
		transform:matrix(1,0,0,1,0,0)}`;
        return style
    });
    return styles
}
