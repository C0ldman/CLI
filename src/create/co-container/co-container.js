export function styles(idArray) {
    let styles = idArray.map((id) => {
        let style = `\r\n#${id} {
		width:100px;
		height:100px;
		transform:matrix(1,0,0,1,0,0)}`;
        return style
    });
    return styles
}
