export function localizations(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = {name:"",content:{}};
		model.name=`${name}`;
		model.content=``;
		return model
	});
	return models
}
