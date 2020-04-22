export function style(elementId) {
	let style = `\r\n#${elementId} {
        position:absolute;
		top:0;
		left:0;
		width:150px;
		height:150px;
		transform:matrix(1,0,0,1,0,0);}`;
	return style
}
