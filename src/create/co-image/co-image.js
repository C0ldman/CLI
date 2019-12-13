export function html(elementId) {
        let html = `<co-image id="${elementId}" class="pa" model="m.${elementId}" user-label="${elementId} image"></co-image>`;
        return html
}

export function model(id, modelName) {
        let model = { name: "", content: {} };
        model.name = `${modelName}`;
        model.content.src = `media/images/${id}/${modelName}.png`;
        model.content.position = "center center";
        model.content.size = "contain";
        return model
}

export function style(elementId, width, height) {
        let newWidth, newHeight;
        width ? newWidth = `${width}px` : newWidth = '100px';
        height ? newHeight = `${height}px` : newHeight = '100px';
        let style = `\r\n#${elementId} {	
	position:absolute;
	top:0;
        left:0;
        width:${newWidth};
	height:${newHeight};
	transform:matrix(1,0,0,1,0,0);}`;
        return style
}

