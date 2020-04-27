export function style(elementId) {
	let style = `\r\n#${elementId} {
        \r\nposition:absolute;
		\r\ntop:0;
		\r\nleft:0;
		\r\nwidth:150px;
		\r\nheight:150px;
		\r\ntransform:matrix(1,0,0,1,0,0);}`;
	return style
}
