import Tower from './cell/Tower'
import Enemy from './Enemy'
import Grid from './Grid'
import Player from './Player'

export default class Game {
	constructor(canvas) {
		this.canvas = canvas

		this.updateSize()

		this.player = new Player(this)
		this.grid = new Grid(this)

		this.enemies = []
		this.wave = 0

		this.time = 0
		this.timeSinceLastWave = 0
		this.timeSinceLastEnemy = 0
		this.enemiesLeft = 5

		this.loop()
	}

	updateSize() {
		this.width = window.innerWidth
		this.height = window.innerHeight

		this.canvas.width = this.width
		this.canvas.height = this.height

		this.cellSize = this.width / 20
	}

	loop() {
		this.time++
		this.timeSinceLastEnemy++

		setTimeout(() => {
			this.enemies.forEach((enemy) => enemy.update(this))
			this.grid.towers.forEach((tower) => tower.update(this))
			this.spawnEnemy()
			this.draw()
			this.loop()
		}, 1000 / 60)
	}

	draw() {
		let ctx = this.canvas.getContext('2d')

		ctx.clearRect(0, 0, this.width, this.height)

		this.grid.draw(ctx)
		this.enemies.forEach((enemy) => enemy.draw(ctx, this.cellSize))
		this.player.draw(ctx)
	}

	spawnEnemy() {
		if (
			this.timeSinceLastEnemy > 3 * 1000 / 60 &&
			this.enemiesLeft > 0
		) {
			let enemy = new Enemy(this.grid.spawn, this.wave)
			this.enemies.push(enemy)
			this.timeSinceLastEnemy = 0
			this.enemiesLeft--
		}

		else if (this.enemies.length === 0) {
			this.timeSinceLastWave++

			if (this.timeSinceLastWave > 3 * 1000 / 60) {
				this.wave++
				this.player.wave++
				this.enemiesLeft = 5 + this.wave
				this.timeSinceLastWave = 0
			}
		}
	}

	enemyReachGoal(enemy) {
		this.player.life--

		enemy.kill(this)

		if (this.player.life <= 0) {
			console.log('Game Over')
		}
	}
}
