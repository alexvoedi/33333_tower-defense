export default class Player {
	constructor(game) {
		this.game = game

		this.wave = 1
		this.money = 10
		this.life = 10
		this.points = 0
	}

	draw(ctx) {
		ctx.fillStyle = 'yellow'
		ctx.font = '50px Arial'
		ctx.fillText(`${this.money} €`, 10, this.game.height - 50)

		ctx.fillStyle = 'red'
		ctx.font = '50px Arial'
		ctx.fillText(`${this.life} HP`, 10, this.game.height - 100)

		ctx.fillStyle = 'green'
		ctx.font = '50px Arial'
		ctx.fillText(`Wave ${this.wave}`, 10, this.game.height - 150)
	}
}
