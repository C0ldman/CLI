export function localization(modelsArray) {
    let models = [];
    modelsArray.forEach((id) => {
        models.push(`{name:"${id}Text1",content:""}`);
        models.push(`{name:"${id}Text2",content:""}`);
        models.push(`{name:"${id}Text3",content:""}`);
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

export function model(id, modelsArray) {
    let models = modelsArray.map((name) => {
        let model = { name: "", content: {} };
        model.name = `${name}`;
        model.content.listStyle = `icon`;
        model.content.items = `[
			{
			"text": {
				"html": "t.${name}Text1"
				},
			"icon": {
				"src": "media/images/${id}/bullet1.png"
				}
				},
			{
			"text": {
					"html": "t.${name}Text2"
					},
					"icon": {
						"src": "media/images/${id}/bullet2.png"
						 }
					},
			{
			"text": {
					"html": "t.${name}Text3"
					},
					"icon": { "src": "media/images/${id}/bullet3.png"
					}
			}
		]`;
        return model
    });
    return models
}
