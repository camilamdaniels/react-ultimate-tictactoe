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
			currPlayer: "X"
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