async function write(slide) {
	fs.writeFileSync(path, jsonString, (err) => {
		if (err) {
			console.log(`Error writing file ${path}`, err)
		}
	});
}

