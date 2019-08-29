export function models(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `{name:${name}",content:{
			"src": "media/images/${id}/${name}.png",
			"position": "center center",
			"size": "contain"
		}"}`;
		return model
	});
	return models
}
