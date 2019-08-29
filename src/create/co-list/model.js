export function models(id,modelsArray) {
	let models = modelsArray.map((name) => {
		let model = {name:"",content:{}};
		model.name=`${name}`;
		model.content.listStyle=`icon`;
		model.content.items= `[
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
