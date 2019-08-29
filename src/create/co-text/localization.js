export function localizations(modelsArray) {
	let models = modelsArray.map((name) => {
		let localization = `{name:${name},content:""}`;
		return localization
	});
	return models
}
