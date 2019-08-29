export function models(id,modelsArray) {
	let models = modelsArray.map((name) => {
		let model = {name:"",content:{}};
		model.name=`${name}`;
		model.content.src=`media/images/${id}/${name}.png`;
		model.content.position= "center center";
		model.content.size= "contain";
		return model
	});
	return models
}
