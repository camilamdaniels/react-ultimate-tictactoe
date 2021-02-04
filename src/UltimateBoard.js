import React, { Component } from 'react';
import Board from './Board'
import './UltimateBoard.css'

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