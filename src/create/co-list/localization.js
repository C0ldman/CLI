export function localizations(modelsArray) {
let models =[];
	modelsArray.forEach((id)=>{
		models.push(`{name:"${id}Text1",content:""}`);
		models.push(`{name:"${id}Text2",content:""}`);
		models.push(`{name:"${id}Text3",content:""}`);
	});
	return models
}
