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
			winner: "",
			gameOver: false
		}
	}

	markCell(i, j) {

		if (this.state.gameOver) return;

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
		if (this.state.gameOver) return;

		let winner = '';
		const board = this.state.board;

		// check rows
		for (let row = 0; row < board.length; row++) {
			let currRow = [];
			for (let col = 0; col < board[row].length; col++) {
					currRow.push(board[row][col])
			}
			if (currRow.every(v => v === 'X')) winner = 'X';
			if (currRow.every(v => v === 'O')) winner = 'O';
		}

		// check cols 
		for (let col = 0; col < board[0].length; col++) {
			let currCol = [];
			for (let row = 0; row < board.length; row++) {
				currCol.push(board[row][col]);
			}
			if (currCol.every(v => v === 'X')) winner = 'X';
			if (currCol.every(v => v === 'O')) winner = 'O';
		}

		// check left diagonal
		let leftDiag = [];
		for (let row = 0, col = 0; row < board.length, col < board.length; row++, col++) {
				leftDiag.push(board[row][col])
		}
		if (leftDiag.every(v => v === 'X')) winner = 'X';
		if (leftDiag.every(v => v === 'O')) winner = 'O';

		// check right diagonal
		let rightDiag = [];
		for (let row = 0, col = board.length - 1; row < board.length, col >= 0; row++, col--) {
			rightDiag.push(board[row][col])
		}
		if (rightDiag.every(v => v === 'X')) winner = 'X';
		if (rightDiag.every(v => v === 'O')) winner = 'O';

		if (!this.state.winner) {
			this.setState({
				winner: winner
			})
		}

		if (this.state.winner) {
			this.setState({
				gameOver: true
			})
		}

		console.log(this.state.winner)
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
			for (let j = 0; j < this.props.N_COLS; j++) {
				row.push('-');
			}
			board.push(row);
		} 

		return board;
	}

	render() {
		if (this.state.gameOver) {
			return (
					<div className="Board Board-winner">{this.state.winner}</div>
			)
		}

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
			<div className="Board Board-grid">{cells}</div>
		)
	}
}

export default Board;