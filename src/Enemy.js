import Goal from './cell/Goal'
import Path from './cell/Path'

export default class Enemy {
	constructor(spawn, wave) {
		this.maxHitpoints = wave + (1.15 ** wave)
		this.hitpoints = this.maxHitpoints
		this.speed = 2

		this.previous = null
		this.cell = spawn
		this.next = null

		this.position = {
			x: spawn.position.x,
			y: spawn.position.y,
		}
	}

	draw(ctx, size) {
		ctx.beginPath()
		ctx.rect(
			this.position.x + size / 3,
			this.position.y + size / 3,
			size / 3,
			size / 3,
		)
		ctx.fillStyle = 'yellow'
		ctx.fill()

		ctx.beginPath()
		ctx.moveTo(
			this.position.x + size / 3,
			this.position.y + size / 3 - 5,
		)
		ctx.lineTo(
			this.position.x + size / 3 + (this.hitpoints / this.maxHitpoints) * (size / 3),
			this.position.y + size / 3 - 5,
		)
		ctx.strokeStyle = 'white'
		ctx.stroke();
	}

	update(game) {
		if (this.hitpoints <= 0) return this.kill()

		this.move(game)
	}

	move(game) {
		if (!this.next) this.getNextCell(game)

		let vector = {
			x: this.next.position.x - this.position.x,
			y: this.next.position.y - this.position.y,
		}

		let distance = Math.sqrt(vector.x ** 2 + vector.y ** 2)

		if (distance < 5) {
			this.previous = this.cell
			this.cell = this.next
			this.next = null
			return this.getNextCell(game)
		}

		let norm = {
			x: vector.x / distance,
			y: vector.y / distance,
		}

		this.position.x += (norm.x * this.speed * game.cellSize / 60)
		this.position.y += (norm.y * this.speed * game.cellSize / 60)
	}

	getNextCell(game) {
		if (this.cell instanceof Goal) {
			return game.enemyReachGoal(this)
		} else {
			let cells = game.grid.cells

			let { x, y } = this.cell

			let surroundingCells = []

			let xLimit = 20
			let yLimit = 10

			if (y > 0) surroundingCells.push(cells[y - 1][x])
			if (x < xLimit) surroundingCells.push(cells[y][x + 1])
			if (y < yLimit) surroundingCells.push(cells[y + 1][x])
			if (x > 0) surroundingCells.push(cells[y][x - 1])

			this.next = surroundingCells.find((cell) => cell instanceof Goal)

			if (!this.next) this.next = surroundingCells.find((cell) => (cell instanceof Path) && cell !== this.previous)
		}
	}

	kill(game) {
		game.enemies = game.enemies.filter((e) => e !== this)
	}

	damage(game, value) {
		this.hitpoints -= value

		if (this.hitpoints <= 0) {
			this.kill(game)
			return true
		} else {
			return false
		}
	}
}
