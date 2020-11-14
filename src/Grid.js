import FreeCell from './cell/FreeCell'
import Goal from './cell/Goal'
import Path from './cell/Path'
import Spawn from './cell/Spawn'
import Tower from './cell/Tower'

import map from './map'

export default class Grid {
	constructor(game) {
		this.game = game

		this.towers = []

		this.loadMap()

		this.addEvents()
	}

	loadMap() {
		let { cellSize: size } = this.game

		this.cells = []

		for (let y = 0; y < map.length; y++) {
			this.cells[y] = []
			for (let x = 0; x < map[y].length; x++) {
				let cellValue = map[y][x]

				if (cellValue === 0) {
					this.cells[y][x] = new FreeCell(x, y, size)
				}

				else if (cellValue === 1) {
					this.cells[y][x] = new Path(x, y, size)
				}

				else if (cellValue === 2) {
					let goal = new Goal(x, y, size)
					this.cells[y][x] = goal
					this.goal = goal
				}

				else if (cellValue === 3) {
					let spawn = new Spawn(x, y, size)
					this.cells[y][x] = spawn
					this.spawn = spawn
				}

				else if (cellValue === 4) {
					let tower = new Tower(x, y, size)
					this.cells[y][x] = tower
					this.towers.push(tower)
				}
			}
		}
	}

	addEvents() {
		this.game.canvas.addEventListener('click', (e) => this.onClick(e))
		window.addEventListener('keydown', (e) => this.onKeyDown(e))
	}

	draw(ctx) {
		for (let x = 0; x < map.length; x++) {
			for (let y = 0; y < map[x].length; y++) {
				this.cells[x][y].draw(ctx, this.game.cellSize)
			}
		}
	}

	onClick(e) {
		let { clientX: x, clientY: y } = e

		let cellX = Math.floor(y / this.game.cellSize)
		let cellY = Math.floor(x / this.game.cellSize)

		if (cellX < 10 && cellY < 20) {
			this.selectCell(this.cells[cellX][cellY])
		}
	}

	onKeyDown(e) {
		// build tower
		if (e.keyCode === 65) {
			if (this.game.player.money >= 5) {
				let { x, y } = this.selectedCell

				let tower = new Tower(x, y, this.game.cellSize)
				this.towers.push(tower)

				this.game.player.money -= 5

				this.selectedCell = tower
				this.cells[y][x] = tower
			}
		}

		// upgrade tower
		else if (e.keyCode === 33) {
			try {
				if (this.game.player.money >= this.selectedCell.level) {
					this.game.player.money -= this.selectedCell.level
					this.selectedCell.level += 1
				}
			} catch (error) {}
		}

		// downgrade tower
		else if (e.keyCode === 34) {
			if (this.selectedCell.level > 1) {
				this.game.player.money += this.selectedCell.level - 1
				this.selectedCell.level -= 1
			}
		}
	}

	selectCell(cell) {
		if (this.selectedCell) this.selectedCell.selected = false

		this.selectedCell = cell

		this.selectedCell.selected = true
	}
}
