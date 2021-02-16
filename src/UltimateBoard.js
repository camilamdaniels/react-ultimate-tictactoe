import React, { Component } from 'react';
import Cell from './Cell';
import './UltimateBoard.css';
import './Board.css';

let CURR_PLAYER = "";
let PLAYING = false;

class UltimateBoard extends Component {

	static defaultProps = {
		BOARD_SIZE: 9,
		N_ROWS: 3,
		N_COLS: 3
	}

	constructor(props) {
		super(props);

		this.state = {
			ultimateBoard: this.createUltimateBoard(),
			winner: "",
			ultimateGameOver: false
		}
	}

	markBoard(i, j) {

		console.log(this.state.ultimateBoard)
		// console.log(this.props.winner)

		if (this.state.ultimateGameOver) return;

		let board = this.state.ultimateBoard;

		if (j >= 0 && j < this.props.N_COLS && i >= 0 && i < this.props.N_ROWS && !PLAYING) {
			board[i][j] = CURR_PLAYER
		}

		this.setState({
			ultimateBoard: board
		})

		this.findUltimateWinner()
	}

	findUltimateWinner() {
		if (this.state.ultimateGameOver) return;

		let winner = '';
		const board = this.state.ultimateBoard;

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

		// if (this.state.winner) {
		// 	this.setState({
		// 		ultimateGameOver: true
		// 	})
		// }

		// console.log(this.state.winner)
	}

	createUltimateBoard() {
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

		console.log("Board props: "+this.props.winner)

		if (this.state.winner) {
			return (
				<div className="UltimateBoard UltimateBoard-winner">GAME OVER! {this.state.winner} WON!</div>
			)
		}

		let boards = [];

		for (let i = 0; i < this.props.N_ROWS; i++) {
			let row = [];
			for (let j = 0; j < this.props.N_COLS; j++) {
				row.push(<Board key={`${i}-${j}`} value={this.state.ultimateBoard[i][j]} showValue={() => this.markBoard(i, j)} winner={this.state.winner}/>)
			}
			boards.push(<div key={i}>{row}</div>)
		}

		return(
			<div className="UltimateBoard">
				<h1 className="UltimateBoard-title">Ultimate Tic-Tac-Toe</h1>
				<div className="UltimateBoard-container">
					<div className="UltimateBoard-grid">
						{boards}
					</div>
				</div>
			</div>
		)
	}
}

export default UltimateBoard;

class Board extends Component {

	static defaultProps = {
		BOARD_SIZE: 9,
		N_ROWS: 3,
		N_COLS: 3
	}

	constructor(props) {
		super(props)

		CURR_PLAYER = !CURR_PLAYER ? "X" : CURR_PLAYER

		this.state = {
			board: this.createBoard(),
			currPlayer: CURR_PLAYER,
			winner: "",
			gameOver: false
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		this.props.showValue()
	}

	markCell(i, j) {

		if (this.state.gameOver) return;

		PLAYING = true;

		let board = this.state.board;

		if (j >= 0 && j < this.props.N_COLS && i >= 0 && i < this.props.N_ROWS) {
			board[i][j] = this.state.currPlayer
		}

		this.setState({
			board: board
		})

		this.findWinner()

		this.togglePlayer()

		
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

		if (winner) {

			this.setState({
				winner: winner,
				gameOver: true
			})

			PLAYING = false
		}

		// if (this.state.winner) {
		// 	PLAYING = false

		// 	// this.setState({
		// 	// 	gameOver: true
		// 	// })
		// }

		// console.log(this.state.winner)
	}

	togglePlayer() {
		// CURR_PLAYER = (CURR_PLAYER === "X") ? "O" : "X"

		// this.setState({
		// 	currPlayer: CURR_PLAYER
		// })

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
					<Cell key={`${i}-${j}`}value={this.state.board[i][j]} showValue={() => this.markCell(i, j)}/>
				)
			}
			cells.push(<div key={i}>{row}</div>)
		}

		return(
			<div className="Board Board-grid" onClick={this.handleClick}>
				{this.props.winner === "" ? cells : this.props.winner}
			</div>
		)
	}
}