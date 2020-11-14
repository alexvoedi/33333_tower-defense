import Cell from './Cell'

export default class FreeCell extends Cell {
	constructor(x, y, size) {
		super(x, y, size)
	}

	draw(ctx) {
		// rect
		ctx.beginPath()
		ctx.rect(
			this.position.x,
			this.position.y,
			this.size - 2,
			this.size - 2,
			)
		ctx.fillStyle = 'black'
		ctx.fill()

		// grid
		ctx.beginPath()
		ctx.strokeStyle = this.selected ? 'white' : 'gray'
		ctx.lineWidth = 2
		ctx.rect(
			this.position.x,
			this.position.y,
			this.size - 2,
			this.size - 2,
		)
		ctx.stroke();
	}
}
