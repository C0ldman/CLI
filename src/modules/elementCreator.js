import * as create from "../elements/create";

export async function createElement(params) {
	let tag = params.name.split('-').join('');
	let model;
	let element={};
	params.attribs.model ? model = params.attribs.model.slice(2) : model = '';
	if (create[tag]) {
		if (create[tag].localization && model) {
			element.localization = create[tag].localization(model);
		};
		if (create[tag].style && params.attribs.id) {
			element.styles = create[tag].style(params.attribs.id)
		};
		if (create[tag].model && model) {
			element.model=create[tag].model(params.attribs.id, model)
		};
		return element
	}
}
