import Path from './Path'

export default class Spawn extends Path {
	constructor(x, y, size) {
		super(x, y, size)
	}

	draw(ctx) {
		ctx.beginPath()
		ctx.arc(
			this.position.x + this.size / 2,
			this.position.y + this.size / 2,
			this.size / 3,
			0,
			2 * Math.PI
		)
		ctx.fill()
	}
}
