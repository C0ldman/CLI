export function models(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = `{name:"${name}",content : "{"html": "t.${name}"}"}`;
		return model
	});
	return models
}
