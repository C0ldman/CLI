export function html(id,imagesIds) {
	let content = imagesIds.map((name) => {
		let html = `<co-image id="${name}" class="pa" model="m.${name}" user-label="${name} image"></co-image>`;
		return html
	});
	return content
}
