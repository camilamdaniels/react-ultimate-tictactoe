import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {

	static defaultProps = {
		BOARD_SIZE: 9,
		N_ROWS: 3,
		N_COLS: 3
	}

	constructor(props) {
		super(props)

		this.state = {
			board: this.createBoard(),
			currPlayer: "X",
			winner: ""
		}
	}

	markCell(i, j) {

		let board = this.state.board;

		if (j >= 0 && j < this.props.N_COLS && i >= 0 && i < this.props.N_ROWS) {
			board[i][j] = this.state.currPlayer
		}

		this.setState({
			board: board
		})

		this.togglePlayer()

		this.findWinner()
	}

	findWinner() {
		// let winner;
		// // check rows
		// for (let i = 0; i < this.props.N_ROWS; i++) {
		// 	let row = this.state.board[i];
		// 	console.log("this is a row: "+row)
		// 	if (row => row.every(val => val === row[0])) winner = row[0];
		// }

		// // check columns
		// for (let i = 0; i < this.props.N_ROWS; i++) {
		// 	let col = [];
		// 	for (let j = 0; j < this.props.N_COLS; j++) {
		// 		col.push(this.state.board[i][j])
		// 	}
		// 	if (col => col.every(val => val === col[0])) winner = col[0];
		// }

		// // check diagonals
		// for (let i = 0, j = 0; i < this.props.N_ROWS, j < this.props.N_COLS; i++, j++) {
		// 	let diag = [];
		// 	diag.push(this.state.board[i][j])
		// 	if (diag => diag.every(val => val === diag[0])) winner = diag[0];
		// }

		// for (let i = 0, j = this.props.N_COLS - 1; i < this.props.N_ROWS, j >= 0; i++, j--) {
		// 	let diag = [];
		// 	diag.push(this.state.board[i][j])
		// 	if (diag => diag.every(val => val === diag[0])) winner = diag[0];
		// }

		// this.setState({
		// 	winner: winner
		// })

		// console.log(this.state.winner)
	}

	togglePlayer() {
		(this.state.currPlayer === "X" ? 
				this.setState({
					currPlayer: "O"
				}) : 
				this.setState({
					currPlayer: "X"
				})
		)
	}

	createBoard() {
		let board = [];

		for (let i = 0; i < this.props.N_ROWS; i++) {
			let row = [];
			board.push(row);
		} 

		return board;
	}

	render() {

		let cells = [];

		for (let i = 0; i < this.props.N_ROWS; i++) {
			let row = [];
			for (let j = 0; j < this.props.N_COLS; j++) {
				row.push(
					<Cell value={this.state.board[i][j]} showValue={() => this.markCell(i, j)}/>
				)
			}
			cells.push(<div>{row}</div>)
		}

		return(
			<div className="Board-grid">{cells}</div>
		)
	}
}

export default Board;