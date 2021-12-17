import Cell from './Cell'

export default class Tower extends Cell {
	constructor(x, y, size) {
		super(x, y, size)

		this.level = 1
		this.baseDamage = 1
		this.range = 3 * size
		this.speed = 2 * 1000 / 60
		this.timer = 0
	}

	draw(ctx) {
		// tower
		ctx.beginPath()
		ctx.rect(
			this.position.x,
			this.position.y,
			this.size - 2,
			this.size - 2,
		)
		ctx.fillStyle = 'green'
		ctx.fill()

		// grid
		ctx.beginPath()
		ctx.rect(
			this.position.x,
			this.position.y,
			this.size - 2,
			this.size - 2,
		)
		ctx.lineWidth = 2
		ctx.strokeStyle = this.selected ? 'white' : 'gray'
		ctx.stroke();

		ctx.fillStyle = 'black'
		ctx.font = '35px Arial'
		ctx.fillText(this.level, this.position.x + 20, this.position.y + 40)

	}

	update(game) {
		let closestEnemy = null
		let closestEnemyDistance = Infinity

		game.enemies.forEach((enemy) => {
			let distance = this.getDistanceTo(enemy)
			if (distance <= this.range) {
				if (distance < closestEnemyDistance) {
					closestEnemy = enemy
					closestEnemyDistance = distance
				}
			}
		})

		if (!closestEnemy) return

		this.timer++

		if (this.timer >= this.speed) {
			let enemyDead = closestEnemy.damage(game, this.baseDamage + this.level)
			this.timer = 0

			if (enemyDead) game.player.money += 1 + game.wave
		}
	}

	getDistanceTo(target) {
		return Math.sqrt((this.position.x - target.position.x) ** 2 + (this.position.y - target.position.y) ** 2)
	}
}
