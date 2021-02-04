import React, { Component } from 'react';
import Board from './Board'
import './Board.css'

class UltimateBoard extends Component {

	static defaultProps = {
		BOARD_SIZE: 9
	}

	constructor(props) {
		super(props);
	}

	render() {

		let boards = [];

		for (let i = 0; i < this.props.BOARD_SIZE; i++) {
			boards.push(<Board />)
		}

		return(
			<div className="UltimateBoard">
				<h1>Ultimate Tic-Tac-Toe</h1>
				<div className="UltimateBoard-grid">
					{boards}
				</div>
			</div>
		)
	}
}

export default UltimateBoard;