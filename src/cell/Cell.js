export default class Cell {
	constructor(x, y, size) {
		this.x = x
		this.y = y

		this.position = {
			x: x * size,
			y: y * size,
		}

		this.size = size
		this.selected = false
	}
}
