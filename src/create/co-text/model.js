export function models(modelsArray) {
	let models = modelsArray.map((name) => {
		let model = {name:"",content:{}};
		model.name=`${name}`;
		model.content.html=`t.${name}`;
		return model
	});
	return models
}
