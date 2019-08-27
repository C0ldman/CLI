

export function createStyles(idArray) {
	let styles = idArray.map((id) => {
		let style = `\r\n#${id} {
		width:100px;
		height:100px;
		transform:matrix(1,0,0,1,0,0)}`;
		return style
	});
	return styles
}

export function createTextModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {
						"html": "t.${name}"
						}`;
		return model
	});
	return models
}

export function createTextLocalization(modelsArray) {
	let models = modelsArray.map((name) => {
		let localization = `\r\n"${name}": ""`;
		return localization
	});
	return models
}

export function createListModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {
		"list-style": "icon",
		"items": [
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
		]}`;
		return model
	});
	return models
}

export function createListLocalization(modelsArray) {
	let models = modelsArray.map((name) => {
		let localization = `\r\n"${name}Text1": "",
		"${name}Text2": "",
		"${name}Text3": ""`;
		return localization
	});
	return models
}

export function createPopupModels(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}": {
		"id": "${name}",
		"showCloseButton": true,
		"showOnSlideEnter": false,
		"hideOnOutsideTap": true,
		"closeOnWillgoto": true
		}`;
		return model
	});
	return models
}

export function createImagesModels(id,modelsArray){
	let models = modelsArray.map((name) => {
		let model = `\r\n"${name}":{
			"src": "media/images/${id}/${name}.png",
			"position": "center center",
			"size": "contain"
		},`;
		return model
	});
	return models
}

export function createImagesStyles (id,idArray){
	let files=getImagesFileList(id);
	let fileName=files.values();
	let styles = idArray.map((idname) => {
		let width, height, name=fileName.next().value;
		let imageDimension = getImageDimensions(id,name);
		
		if(isOdd(imageDimension.width)){
			gm(`./app/images/${id}/${name}`).resize(500,500);
			width=imageDimension.width;
		}else{width=imageDimension.width};
		
		if(isOdd(imageDimension.height)){
			gm(`./app/images/${id}/${name}`).resize(600,600);
			height=imageDimension.height;
		}else{height=imageDimension.height};
		
		let style = `\r\n#${idname}  {
			width:${width/2}px;
			height:${height/2}px;
			transform:matrix(1,0,0,1,0,0);}`;
		return style
	});
	return styles
}

export function createImagesHTML(id,imagesIds) {
	let content = imagesIds.map((name) => {
		let html = `<co-image id="${name}" class="pa" model="m.${name}" user-label="${name} image"></co-image>`;
		return html
	});
	return content
}
