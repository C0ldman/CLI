export function html(elementId) {
    let html = `<co-image id="${elementId}" class="pa" model="m.${elementId}" user-label="${elementId} image"></co-image>`;
        return html
}

export function model(id,modelName) {
        let model = { name: "", content: {} };
        model.name = `${modelName}`;
        model.content.src = `media/images/${id}/${modelName}.png`;
        model.content.position = "center center";
        model.content.size = "contain";
        return model
}

export function style(elementId,width='100px',height='100px') {
        let style = `\r\n#${elementId} {
	width:${width};
	height:${height};
	transform:matrix(1,0,0,1,0,0);}`;
        return style
}

